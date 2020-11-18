/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
const Form = require('../schemas/Form');

const { createReqWithAgeGroup } = require('../../utils/parseAgeGroup');
const { createCsv } = require('../../utils/createCsv');

class FormController {
  async index(req, res) {
    const forms = await Form.find();
    let i = 0;

    const formsWithId = forms.map(form => {
      i++;
      return { id: i, ...form._doc };
    });

    return res.render('history/index.njk', { forms: formsWithId });
  }

  async show(req, res) {
    Form.findById(req.params.id, (err, form) => {
      if (!form) {
        return res.status(404).send('Formulário não encontrado');
      }

      return res.render('history/show.njk', { form });
    });
  }

  async store(req, res) {
    try {
      // Form 3, primeira parte, BOTÂO SIMULAR
      if (req.body.insurance_company === 'Bradesco') {
        const newProfiles = Object.values(req.body.profiles);
        req.body.profiles = newProfiles;

        const form = await Form.create(req.body);
        createCsv(form);
        return res.render('index.njk', { sucess: 'Sucesso na Gravação' });
      }

      const reqFull = createReqWithAgeGroup(req.body);

      const newForm = new Form(reqFull);

      newForm.save().then(form => {
        createCsv(form);
        return res.render('index.njk', {
          sucess: 'Sucesso na gravação',
        });
      });

      return true;
    } catch (error) {
      return res.render('index.njk', {
        error: 'Erro ao gravar',
      });
    }
  }

  async update(req, res) {
    const { id } = req.body;

    try {
      await Form.findById(id, async (err, form) => {
        if (!form) res.status(404).send('Formulário não encontrado');
        else {
          const newProfiles = Object.values(...form.profiles);

          form.type_activity = req.body.type_activity;
          form.professional_category = req.body.professional_category;
          form.card_number = req.body.card_number;
          form.qtd_lifes_bradesco = req.body.qtd_lifes_bradesco;
          form.transfer_bradesco = req.body.transfer_bradesco;
          form.profile_activity = req.body.profile_activity;
          form.profiles = newProfiles;

          await form
            .save()
            .then(form => {
              createCsv(form);
              return res.render('index.njk', {
                sucess: 'Sucesso na gravação',
              });
            })
            .catch(err => {
              return res.render('index.njk', {
                error: 'Erro ao gravar',
              });
            });
        }
      });
    } catch (err) {
      return res.render('index.njk', {
        error: 'Erro ao gravar',
      });
    }
  }
}

module.exports = new FormController();
