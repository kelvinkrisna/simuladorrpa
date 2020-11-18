const Yup = require('yup');

async function validateForms(req, res, next) {
  if (req.body.insurance_company === 'Sulamérica') {
    const schema = Yup.object().shape({
      insurance_company: Yup.string().required('Formulario Obrigatorio'),
      company_name: Yup.string().required(),
      cnpj: Yup.string().required(),
      type_cnpj: Yup.string().required(),
      uf: Yup.string().required('Nome da Compania Obrigatorio'),
      county: Yup.string().required('Nome da Compania Obrigatorio'),
      health_product: Yup.string().required('Nome da Compania Obrigatorio'),
      type_contract: Yup.string().required('Nome da Compania Obrigatorio'),
      qtd_lives: Yup.string().required('Nome da Compania Obrigatorio'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.render('index.njk', {
        error: 'Obrigatório preencher todos os Campos ',
      });
    }

    if (!req.body.plans) {
      return res.render('form1/index.njk', {
        error: 'Obrigatorio selecionar Plano',
      });
    }

    return next();
  }
  if (req.body.insurance_company === 'Amil') {
    const schema = Yup.object().shape({
      insurance_company: Yup.string().required(),
      coalition: Yup.string().required(),
      qtd_coalition: Yup.string(),
      mei: Yup.string().required(),
      company_name: Yup.string().required(),
      cnpj: Yup.string().required(),
      table: Yup.string().required(),
      cep: Yup.string().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.render('form2/index.njk', {
        error: 'Obrigatório preencher todos os Campos ',
      });
    }

    return next();
  }
  if (req.body.insurance_company === 'Bradesco') {
    if (req.body.profile_activity) {
      const schema = Yup.object().shape({
        insurance_company: Yup.string().required(),

        type_activity: Yup.string().required(),
        professional_category: Yup.string().required(),
        transfer_bradesco: Yup.string().required(),
        qtd_lifes_bradesco: Yup.string().required(),
        card_number: Yup.string().required(),
        profile_activity: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.render('form3/index.njk', {
          error: 'Obrigatório preencher todos os Campos ',
        });
      }

      return next();
    }
    const schema = Yup.object().shape({
      insurance_company: Yup.string().required(),
      company_name: Yup.string().required(),
      cnpj: Yup.string().required(),
      quote_type: Yup.string().required(),
      acession: Yup.string().required(),
      product: Yup.string().required(),
      spg: Yup.string().required(),
      payment: Yup.string().required(),
      co_participation: Yup.string().required(),
      number_holders: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.render('form3/index.njk', {
        error: 'Obrigatório preencher todos os Campos ',
      });
    }

    return next();
  }
}

module.exports = { validateForms };
