/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const csv = require('fast-csv');
const {
  getGroupTitle,
  getGroupValues,
  createObjectDataAge,
  // createAgeGroupCrv,
  createObjectDataProfile,
  getGroupTitleSameLine,
  getGroupValueSameLine,
} = require('./parseAgeGroup');

function createCsv(result) {
  if (result.insurance_company === 'Sulamérica') {
    const ws = fs.createWriteStream(
      `./tmp/form${result.insurance_company}${result._id}.csv`
    );

    const dataGroup = createObjectDataAge(result.plans);

    const ageGroupTitle = getGroupTitle(dataGroup);
    const ageGroupValue = getGroupValues(dataGroup);
    // const ageGroup = createAgeGroupCrv(ageGroupTitle, ageGroupValue);

    const titleInSameLine = getGroupTitleSameLine(ageGroupTitle);
    const valueInSameLine = getGroupValueSameLine(ageGroupValue);

    csv
      .write([
        [
          'id',
          'Formulario',
          'Nome da Empresa',
          'Cnpj',
          'Tipo Cnpj',
          'UF',
          'Municipio',
          'Produto',
          'Tipo de Contrato',
          'Numero de pessoas',
          ' ',
          ...titleInSameLine,
          /*  ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ', */
        ],
        [
          result._id,
          result.insurance_company,
          result.company_name,
          result.cnpj,
          result.type_cnpj,
          result.uf,
          result.county,
          result.health_product,
          result.type_contract,
          result.qtd_lives,
          ' ',
          ...valueInSameLine,
        ],
        /*  [' ', ' '],
        ['Planos e Faixa Etária'],
        [' ', ' '],
        ...ageGroup, */
      ])
      .pipe(ws);
  }
  if (result.insurance_company === 'Amil') {
    const ws = fs.createWriteStream(
      `./tmp/form${result.insurance_company}${result._id}.csv`
    );

    const dataGroup = createObjectDataAge(result.plans);

    const ageGroupTitle = getGroupTitle(dataGroup);

    const ageGroupValue = getGroupValues(dataGroup);

    // const ageGroup = createAgeGroupCrv(ageGroupTitle, ageGroupValue);

    const titleInSameLine = getGroupTitleSameLine(ageGroupTitle);
    const valueInSameLine = getGroupValueSameLine(ageGroupValue);

    csv
      .write([
        [
          'id',
          'Formulario',
          'Coligação',
          'Qtd Coligação',
          'Mei',
          'Nome da Empresa',
          'Cnpj',
          'Tabela',
          'Cep',
          'Produto',
          ' ',
          ...titleInSameLine,
        ],
        [
          result._id,
          result.insurance_company,
          result.coalition,
          result.qtd_coalition,
          result.mei,
          result.company_name,
          result.cnpj,
          result.table,
          result.cep,
          result.product,
          ' ',
          ...valueInSameLine,
        ],
        /* [' ', ' '],
        ['Planos e Faixa Etária'],
        [' ', ' '],
        ...ageGroup, */
      ])
      .pipe(ws);
  }
  if (result.insurance_company === 'Bradesco') {
    const ws = fs.createWriteStream(
      `./tmp/form${result.insurance_company}${result._id}.csv`
    );

    const dataProfile = createObjectDataProfile(result.profiles);
    const ageGroupTitle = getGroupTitle(dataProfile);
    const ageGroupValue = getGroupValues(dataProfile);

    // const profileGroup = createAgeGroupCrv(ageGroupTitle, ageGroupValue);

    const titleInSameLine = getGroupTitleSameLine(ageGroupTitle);
    const valueInSameLine = getGroupValueSameLine(ageGroupValue);

    if (result.profile_activity) {
      csv
        .write([
          [
            'id',
            'Formulario',
            'Nome da Empresa',
            'CNPJ',
            'Ramo de Atividade',
            'Categoria Profissional',
            'Transferencia Bradesco',
            'Qtd Transferencia',
            'Numero cartão',
            'Perfil Profissional',
            'Tipo de Cotação',
            'Tipo de Adesão',
            'Produto',
            'SPG',
            'Pagamento',
            'CoParticipação',
            'Qtd Titulares',
            ' ',
            ...titleInSameLine,
          ],
          [
            result._id,
            result.insurance_company,
            result.company_name,
            result.cnpj,
            result.type_activity,
            result.professional_category,
            result.transfer_bradesco,
            result.qtd_lifes_bradesco,
            result.card_number,
            result.profile_activity,
            result.quote_type,
            result.acession,
            result.product,
            result.spg,
            result.payment,
            result.co_participation,
            result.number_holders,
            ' ',
            ...valueInSameLine,
          ],
          /*  [' ', ' '],
          ['Perfil e Faixa Etária'],
          [' ', ' '],
          ...profileGroup,
          */
        ])
        .pipe(ws);
    } else {
      csv
        .write([
          [
            'id',
            'Formulario',
            'Nome da Empresa',
            'CNPJ',
            'Tipo de Cotação',
            'Tipo de Adesão',
            'Produto',
            'SPG',
            'Pagamento',
            'CoParticipação',
            'Qtd Titulares',
            ' ',
            ...titleInSameLine,
          ],
          [
            result._id,
            result.insurance_company,
            result.company_name,
            result.cnpj,
            result.quote_type,
            result.acession,
            result.product,
            result.spg,
            result.payment,
            result.co_participation,
            result.number_holders,
            ' ',
            ...valueInSameLine,
          ],
          /*  [' ', ' '],
          ['Perfil e Faixa Etária'],
          [' ', ' '],
          ...profileGroup, */
        ])
        .pipe(ws);
    }
  }
}

module.exports = { createCsv };
