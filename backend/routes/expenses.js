const express = require('express');
const router = express.Router();
const expensesService = require('../services/expenses.js');

router.get('/', (req, res) => {
  try {
    const expenses = expensesService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
});

router.post('/', (req, res) => {
  try {
    const newExpense = {
      id: Date.now().toString(),
      date: req.body.date,
      description: req.body.description,
      payer: req.body.payer,
      amount: parseFloat(req.body.amount),
    };

    const addedExpense = expensesService.addExpense(newExpense);
    res.status(201).json(addedExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.post('/reset', (req, res) => {
  try {
    const resetData = expensesService.resetExpenses();
    res.json({
      message: 'Expenses reset successfully',
      data: resetData,
    });
  } catch (error) {
    console.error('Error resetting expenses:', error);
    res.status(500).json({ error: 'Failed to reset expenses' });
  }
});

module.exports = router;
