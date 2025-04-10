const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  dueDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
});

loanSchema.methods.calculateFine = function () {
  if (!this.returned && new Date() > this.dueDate) {
    const daysLate = Math.ceil((new Date() - this.dueDate) / (1000 * 60 * 60 * 24));
    const finePerDay = 1; // Define fine amount per day
    return daysLate * finePerDay;
  }
  return 0;
};

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
