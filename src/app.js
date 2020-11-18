const express = require('express');
require('./database');
const path = require('path');

const app = express();
const nunkucks = require('nunjucks');
const methodOverride = require('method-override');

const uf_counties = require('./utils/uf_counties');
const amil_products = require('./utils/amil_products');
const FormController = require('./app/controllers/FormController');
const Form = require('./app/schemas/Form');

const { validateForms } = require('./app/middlewares/validateForms');

app.use(express.json());

app.set('view engine', 'njk');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/static', express.static(path.resolve(__dirname, 'app', 'views')));
app.use(express.urlencoded({ extended: true }));
nunkucks.configure('src/app/views', {
  express: app,
  autoescape: false,
  noCache: true,
});

app.get('/', (req, res) => {
  return res.render('index.njk');
});

app.get('/form1', (req, res) => {
  return res.render('form1/index.njk', { uf_counties });
});

app.get('/forms', FormController.index);

app.post('/form1', FormController.store);
app.post('/form2', validateForms, FormController.store);
app.post('/form3', validateForms, FormController.store);
app.put('/form3', validateForms, FormController.update);

app.get('/form2', (req, res) => {
  return res.render('form2/index.njk', { amil_products });
});

app.get('/form3', (req, res) => {
  return res.render('form3/index.njk');
});

app.get('/form3/:id', (req, res) => {
  return res.render('form3/index_page2.njk');
});

app.post('/formpart2', validateForms, (req, res) => {
  const newForm = new Form(req.body);

  newForm.save().then(form => {
    return res.render('form3/index_page2.njk', { id: form.id });
  });
});

app.get('/history', FormController.index);
app.get('/:id', FormController.show);

// Adicionando Rota para a pagina 2 do formulário 3

app.listen(5000, () => {
  console.log('rodando na porta 5000');
});
