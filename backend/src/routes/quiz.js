const express = require('express');
const router = express.Router();
const Joi = require('joi');
const supabase = require('../utils/supabase');
const { authenticate } = require('../middleware/auth');

// GET /api/quiz/mock-tests/:id — fetch test + questions (answers hidden)
router.get('/mock-tests/:id', async (req, res) => {
  const { error: valErr } = Joi.string().uuid().validate(req.params.id);
  if (valErr) return res.status(400).json({ error: 'Invalid test ID' });

  const { data: test, error } = await supabase
    .from('mock_tests')
    .select('id, title, description, total_questions, duration_minutes, total_marks, is_free, exam_id')
    .eq('id', req.params.id)
    .single();

  if (error || !test) return res.status(404).json({ error: 'Mock test not found' });

  const { data: questions } = await supabase
    .from('mock_test_questions')
    .select('id, question, option_a, option_b, option_c, option_d, subject, difficulty, order_num')
    .eq('mock_test_id', req.params.id)
    .order('order_num', { ascending: true });

  res.json({ ...test, questions: questions || [] });
});

// POST /api/quiz/mock-tests/:id/submit — submit answers, get results
router.post('/mock-tests/:id/submit', authenticate, async (req, res) => {
  const { error: valErr } = Joi.string().uuid().validate(req.params.id);
  if (valErr) return res.status(400).json({ error: 'Invalid test ID' });

  const { answers, time_taken_minutes } = req.body;
  if (!answers || typeof answers !== 'object') return res.status(400).json({ error: 'answers required' });

  const { data: questions, error } = await supabase
    .from('mock_test_questions')
    .select('id, correct_answer, explanation')
    .eq('mock_test_id', req.params.id);

  if (error || !questions) return res.status(404).json({ error: 'Test not found' });

  const { data: test } = await supabase
    .from('mock_tests')
    .select('total_marks, total_questions')
    .eq('id', req.params.id)
    .single();

  let score = 0;
  const results = questions.map(q => {
    const userAnswer = answers[q.id];
    const correct = userAnswer === q.correct_answer;
    if (correct) score++;
    return { id: q.id, correct_answer: q.correct_answer, user_answer: userAnswer, correct, explanation: q.explanation };
  });

  const marksPerQuestion = test ? test.total_marks / test.total_questions : 1;
  const totalScore = Math.round(score * marksPerQuestion);

  // Save attempt (fire-and-forget)
  supabase.from('mock_test_attempts').insert({
    user_id: req.user.id,
    mock_test_id: req.params.id,
    score: totalScore,
    total_marks: test?.total_marks,
    time_taken_minutes: time_taken_minutes || null,
    answers,
  }).then(() => {});

  res.json({ score: totalScore, total_marks: test?.total_marks, correct: score, total: questions.length, results });
});

// GET /api/quiz/today
router.get('/today', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('daily_quiz')
    .select('id, question, option_a, option_b, option_c, option_d, subject, quiz_date')
    .eq('quiz_date', today)
    .single();

  if (error || !data) return res.status(404).json({ error: 'No quiz for today' });
  res.json(data);
});

// POST /api/quiz/today/answer
router.post('/today/answer', async (req, res) => {
  const { quiz_id, answer } = req.body;
  const { data, error } = await supabase
    .from('daily_quiz')
    .select('correct_answer, explanation')
    .eq('id', quiz_id)
    .single();

  if (error) return res.status(404).json({ error: 'Quiz not found' });

  res.json({
    correct: data.correct_answer === answer,
    correct_answer: data.correct_answer,
    explanation: data.explanation,
  });
});

module.exports = router;
