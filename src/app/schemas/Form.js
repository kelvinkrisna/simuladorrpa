const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema(
  {
    insurance_company: {
      type: String,
      required: true,
    },
    qtd_lives: { type: String },
    cnpj: { type: String },
    type_cnpj: { type: String },
    health_product: { type: String },
    uf: { type: String },
    county: { type: String },
    type_contract: { type: String },
    plans: { type: [Object], blackbox: true },
    coalition: { type: String },
    mei: { type: String },
    qtd_coalition: { type: String },
    company_name: { type: String },
    table: { type: String },
    cep: { type: String },
    product: { type: String },
    quote_type: { type: String },
    acession: { type: String },
    spg: { type: String },
    co_participation: { type: String },
    number_holders: { type: String },
    profiles: { type: [Object], blackbox: true },
    type_activity: { type: String },
    professional_category: { type: [Object], blackbox: true },
    transfer_bradesco: { type: String },
    qtd_lifes_bradesco: { type: [Object], blackbox: true },
    payment: { type: String },
    card_number: { type: [Object], blackbox: true },
    profile_activity: { type: String },
    product_type: {type: String},
    type: {type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Form', FormSchema);
