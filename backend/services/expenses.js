const fs = require('fs');
const path = require('path');

const EXPENSES_FILE_PATH = path.join(__dirname, '../data/expenses.json');
const EXPENSES_INIT_FILE_PATH = path.join(__dirname, '../data/expenses.init.json');

function getAllExpenses() {
  return prisma.expense.findMany();
}

function addExpense(expense) {
 return prisma.expense.create({ data: expense });
}

function resetExpenses() {
  const initData = fs.readFileSync(EXPENSES_INIT_FILE_PATH, 'utf8');
  fs.writeFileSync(EXPENSES_FILE_PATH, initData);
  return JSON.parse(initData);
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
