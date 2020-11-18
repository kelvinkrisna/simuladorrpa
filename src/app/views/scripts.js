/* eslint-disable no-restricted-syntax */
const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value);
    }, 1);
  },

  cnpj(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 14) value = value.slice(0, -1);

    // check if is  cnpj -12.123.123/1234-12

    // cnpj
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    return value;
  },

  cep(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, -1);
    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    return value;
  },
};
function coligationField() {
  const divItem = document.createElement('div');
  divItem.setAttribute('id', 'quantityInputNumber');
  divItem.classList.add('item');

  divItem.innerHTML = `
      <div> Quantidade </div>
      <input
      type="number"
      name="qtd_lives"
      value="{{number}}"
      max="29"
      min="1"
      >
    `;
  const coligation = document.querySelector('.coligation');
  insertAfter(coligation, divItem);
}

function insertAfter(refereceNode, newNode) {
  if (
    refereceNode.nextElementSibling.getAttribute('id') !== 'quantityInputNumber'
  ) {
    refereceNode.parentNode.insertBefore(newNode, refereceNode.nextSibling);
  }
}

function removeAfter(refereceNode) {
  if (refereceNode.getAttribute('id') === 'quantityInputNumber') {
    refereceNode.remove();
  }
}

function removeOptionCompulsory() {
  const select = document.getElementById('table');

  select[0].removeAttribute('selected');
  select[0].style.display = 'none';

  select[0].innerHTML = '';
  select[0].setAttribute('value', 'optional');

  select[1].setAttribute('selected', '');
}

function addOptionCompulsory() {
  const select = document.getElementById('table');

  select[0].style.display = 'inline';
  select[0].innerHTML = 'Compulsória';
  select[0].setAttribute('value', 'Compulsória');

  select[1].removeAttribute('selected');
}

// Funcoes para o campo Produto
function showProductForm() {
  const productSelect = document.querySelector('[product]');
  const { value } = productSelect[productSelect.selectedIndex];

  switch (value) {
    case 'Top':
      productTop();
      break;
    case 'Hospital':
      productHospital();
      break;

    default:
      break;
  }
}

// Funcoes para o campo TypeProduct
function showShowProductType() {
  const quoteType = document.querySelector('[quote_type]');
  const { value } = quoteType[quoteType.selectedIndex];

  switch (value) {
    case 'Conjugado':
      const selectProductType = document.querySelector('[product_type]');
    selectProductType.style.display = 'inline';
      break;


    default:
      const selectProductTypeNone = document.querySelector('[product_type]');
      selectProductTypeNone.style.display = 'none';

    break;
  }
}


function productTop() {
  const selectCoParticipation = document.querySelector('[coParticipation]');
  const networkSelect = document.querySelector('[network]');
  let selectOption;
  for (selectOption of selectCoParticipation) {
    selectOption.style.display = 'inline';
  }
  for (selectOption of networkSelect) {
    if (selectOption.value == 'Nacional TOP') selectOption.selected = false;
    if (selectOption.value == 'Nacional Flex')
      // selectOption.selected = true;
      selectOption.style.display = 'inline';
  }
}
function productHospital() {
  const selectCoParticipation = document.querySelector('[coParticipation]');
  const networkSelect = document.querySelector('[network]');
  let selectOption;

  for (selectOption of selectCoParticipation) {
    if (selectOption.value !== '0%') {
      selectOption.style.display = 'none';
    }
  }
  for (selectOption of networkSelect) {
    if (selectOption.value == 'Nacional Flex') {
      selectOption.style.display = 'none';
      networkSelect[0].selected = true;
    }
  }
}

// Funcoes para o campo SPG
function showSpgForm() {
  const selectContainer = document.querySelector('[spg]');
  const { value } = selectContainer[selectContainer.selectedIndex];
  switch (value) {
    case '3-29':
      holders.revertHolders();
      break;
    case '30-99':
      // profile2Add();
      holders.holders();
      addOwner.checkedFieldHolders();
      break;

    case '100-199':
      holders.holders();
      addOwner.checkedFieldHolders();
      break;

    default:
      profile2Remove();
      break;
  }
}
const holders = {
  holders() {
    const holdersRadio = document.getElementsByName('number_holders');
    const moreHolders = holdersRadio[1];
    const oneHolder = holdersRadio[0];

    moreHolders.checked = true;
    oneHolder.setAttribute('disabled', 'disabled');
  },

  revertHolders() {
    const holdersRadio = document.getElementsByName('number_holders');
    const oneHolder = holdersRadio[0];

    oneHolder.removeAttribute('disabled');
  },
};

function addType(valor){
  debug;
  const file = document.querySelector('.profile');
  file.setAttribute('value', valor);
}

function addProfile() {
  const fields = document.querySelector('.fields');

  let option;
  let name;

  const profileQtd = document.querySelectorAll('.profileMore').length;
  const profileField = document.querySelector('.profile');

  const newProfile = profileField.cloneNode(true);
  newProfile.setAttribute('id', "perfil"+profileQtd);

  const divTitle = document.createElement('div');
  divTitle.innerHTML = `Perfil ${profileQtd + 2} <br>`;
  const value = `profile${profileQtd + 2}`;
  //divTitle.setAttribute('id', );
  

  var button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('onclick', 'removeProfile('+profileQtd+');');
    button.appendChild(document.createTextNode('Remover'));
    divTitle.appendChild(button);
  // Abaixo, a função está tratando o name de cada campo, para ter diferenciação de perfil
  const selectNetworkOptions = newProfile.children[0].children[1];
  // name = selectNetworkOptions.getAttribute('name');
  name = `profiles[${value}][network]`;
  selectNetworkOptions.setAttribute('name', name);

  const selectRegion = newProfile.children[1].children[1];
  // name = selectRegion.getAttribute('name');
  name = `profiles[${value}][region]`;
  selectRegion.setAttribute('name', name);

  const selectAcomodation = newProfile.children[2].children[1];
  // name = selectAcomodation.getAttribute('name');

  name = `profiles[${value}][accommodation]`;
  selectAcomodation.setAttribute('name', name);

  const ageGroup = newProfile.children[3].querySelectorAll('.ageGroupField');
  let i = 0;

  for (i; i <= ageGroup.length - 1; i++) {
    const idGroup = ageGroup[i].children[1].getAttribute('id');
    ageGroup[i].children[1].setAttribute('value', '0');
    ageGroup[i].children[1].setAttribute('min', '0');

    switch (idGroup) {
      case '0-18':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '19-23':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '24-28':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '29-33':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '34-38':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '39-43':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '44-48':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '49-53':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '54-58':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

      case '59-64':
        name = `profiles[${value}][ageGroups][${idGroup}]`;
        break;

        case '65-80':
          name = `profiles[${value}][ageGroups][${idGroup}]`;
          break;

          case '81':
            name = `profiles[${value}][ageGroups][${idGroup}]`;
            break;

      default:
        break;
    }

    ageGroup[i].children[1].setAttribute('name', name);
  }

  newProfile.setAttribute('class', 'profileMore');
  newProfile.insertAdjacentElement('afterbegin', divTitle);

  fields.appendChild(newProfile);
}
// function formatProfile1() {
//   const profileField = document.querySelector('.profile');
//   let name;
//   const value = 'P1';

//   const selectNetworkOptions = profileField.children[0].children[1];
//   name = selectNetworkOptions.getAttribute('name');
//   name = `${value}${name}`;
//   selectNetworkOptions.setAttribute('name', name);

//   const selectRegion = profileField.children[1].children[1];
//   name = selectRegion.getAttribute('name');
//   name = `${value}${name}`;
//   selectRegion.setAttribute('name', name);

//   const selectAcomodation = profileField.children[2].children[1];
//   name = selectAcomodation.getAttribute('name');
//   name = `${value}${name}`;
//   selectAcomodation.setAttribute('name', name);

//   const ageGroup = profileField.children[3].querySelectorAll('.ageGroupField');
//   let i = 0;

//   for (i; i <= ageGroup.length - 1; i++) {
//     name = ageGroup[i].children[1].getAttribute('name');
//     name = `${value}${name}`;
//     ageGroup[i].children[1].setAttribute('name', name);
//   }
// }
function removeProfile() {
  const profiles = document.querySelectorAll('.profileMore');
  let profile;

  for (profile of profiles) {
    profile.remove();
  }
}

function removeProfile(i) {
  const profiles = document.querySelectorAll('.profileMore');
  //const profile = document.querySelector("#" +i);
  let profile;
  for (profile of profiles) {
    console.log(profile);
    if (profile.id == ("perfil"+i)){
      profile.remove();
    }
    
  }

}
function checkLimitProfile(button) {
  const totalPerfil = document.querySelectorAll('.profileMore');
  if (totalPerfil.length > 2) {
    console.log('Oiii');
    button.setAttribute('disabled', 'disabled');
  }
}

function profile2Remove() {
  const profile2Container = document.querySelector('.profile2');
  const { display } = profile2Container.style;
  if (display === 'inline') {
    profile2Container.style.display = 'none';
  }
}

// Funções para o campo modo de pagamento
function costOption() {
  const acessionRadio = document.getElementsByName('acession');
  const checkedCompulsory = acessionRadio[1].checked;

  const selectContainer = document.querySelector('[spg]');
  const { value } = selectContainer[selectContainer.selectedIndex];
  const selectedOver100 = value;

  const payment = document.querySelector('[payment]');
  const optionAverageCost = payment[1];

  if (checkedCompulsory && selectedOver100 === '>100') {
    addAverageCostOption(optionAverageCost);
    return;
  }
  removeAverageCostOption(
    checkedCompulsory,
    selectedOver100,
    optionAverageCost
  );
}
function addAverageCostOption(optionAverageCost) {
  optionAverageCost.innerHTML = 'Custo Médio';
  optionAverageCost.setAttribute('value', 'Custo Médio');
  optionAverageCost.removeAttribute('disabled');
  optionAverageCost.style.display = 'inline';
}

function removeAverageCostOption(
  checkedCompulsory,
  selectedOver100,
  optionAverageCost
) {
  if (!checkedCompulsory || selectedOver100 !== '>100') {
    optionAverageCost.innerHTML = '';
    optionAverageCost.setAttribute('value', 'Faixa Etária');
    optionAverageCost.style.display = 'none';
  }
}

// Funcoes para o campo do Network

function showNetworkForm(networkSelect, divField) {
  const { value } = networkSelect[networkSelect.selectedIndex];

  switch (value) {
    case 'Nacional Flex':
      nacionalFlex(divField);
      break;

    case 'Nacional':
      nacional(divField);
      break;

    case 'Nacional Plus':
      nacionalPlus(divField);
      break;
    case 'empty':
      cleanOptionsNetwork(divField);
      break;
    default:
      break;
  }
}

function nacionalFlex(divField) {
  const accommodation = divField.querySelector('[accommodation]');
  let selectAccommodation;

  // eslint-disable-next-line no-restricted-syntax
  for (selectAccommodation of accommodation) {
    if (
      selectAccommodation.value !== 'Enfermaria' &&
      selectAccommodation.value !== 'Apartamento'
    ) {
      selectAccommodation.style.display = 'none';
    } else {
      selectAccommodation.style.display = 'inline';
    }
  }
}

function nacional(divField) {
  const accommodation = divField.querySelector('[accommodation]');
  let selectAccommodation;

  for (selectAccommodation of accommodation) {
    if (
      selectAccommodation.value === 'Múltiplo 4' ||
      selectAccommodation.value === 'Múltiplo 6' ||
      selectAccommodation.value === 'Múltiplo 8'
    ) {
      selectAccommodation.style.display = 'none';
    } else {
      selectAccommodation.style.display = 'inline';
    }
  }
}

function nacionalPlus(divField) {
  const accommodation = divField.querySelector('[accommodation]');
  let selectAccommodation;

  for (selectAccommodation of accommodation) {
    if (
      selectAccommodation.value === 'Múltiplo 2' ||
      selectAccommodation.value === 'Múltiplo 3' ||
      selectAccommodation.value === 'Enfermaria' ||
      selectAccommodation.value === 'Apartamento'
    ) {
      selectAccommodation.style.display = 'none';
    } else {
      selectAccommodation.style.display = 'inline';
    }
  }
}

function cleanOptionsNetwork(divField) {
  const accomodation = divField.querySelector('[accommodation');
  let selectAccomodation;
  for (selectAccomodation of accomodation) {
    if (selectAccomodation.value == 'empty') {
      selectAccomodation.selected = true;
    } else {
      selectAccomodation.style.display = 'none';
      selectAccomodation.removeAttribute('selected');
    }
  }
}

// Funcao para Regiao chamadno Modal

function showRegionForm(regionSelect) {
  const { value } = regionSelect[regionSelect.selectedIndex];

  switch (value) {
    case 'Centro Oeste Exceto DF':
      region.centroOeste();
      break;

    case 'Distrito Federal':
      region.df();
      break;

    case 'Nordeste':
      region.nordeste();
      break;

    case 'Norte':
      region.norte();
      break;

    case 'Paraná':
      region.parana();
      break;

    case 'São Paulo Capital':
      region.spCapital();
      break;

    case 'SÃO PAULO - INTERIOR - 1':
      region.spInterior1();
      break;

    case 'SÃO PAULO - INTERIOR - 2':
      region.spCapital2();
      break;

    default:
      break;
  }
}
const region = {
  centroOeste() {
    const topic =
      'Para as cidades abaixo relacionadas deverá ser utilizada para cotação a tabela do Distrito Federal:';
    const content = `NOVO GAMA, PEDREGAL, ABADIÂNIA, ÁGUA FRIA DE GOIÁS, ÁGUAS LINDAS DE GOIÁS, ALEXÂNIA,
    CIDADE OCIDENTAL, COCALZINHO DE GOIÁS, CORUMBÁ, CRISTALINA, FORMOSA, LUZIÂNIA, MIMOSO DE GOIÁS, PADRE BERNARDO, JARDIM INGÁ,
    PLANALTINA DE GOIÁS, SANTO ANTÔNIO DO DESCOBERTO, VALPARAISO DE GOIÁS e PIRENÓPOLIS.`;
    Modal.insertTitleandContent(topic, content);

    Modal.showModal();
  },
  df() {
    const topic = `Para as cidades abaixo relacionadas deverá ser utilizada para cotação a tabela do Distrito Federal:`;
    const content = `NOVO GAMA, PEDREGAL, ABADIÂNIA, ÁGUA FRIA DE GOIÁS, ÁGUAS LINDAS DE GOIÁS, ALEXÂNIA, CIDADE OCIDENTAL,
      COCALZINHO DE GOIÁS, CORUMBÁ, CRISTALINA, FORMOSA, LUZIÂNIA, MIMOSO DE GOIÁS, PADRE BERNARDO,
      JARDIM INGÁ, PLANALTINA DE GOIÁS, SANTO ANTÔNIO DO DESCOBERTO, VALPARAISO DE GOIÁS e PIRENÓPOLIS.`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  nordeste() {
    const topic = `Fique atento! `;
    const content = `Os Estados do Maranhão e Alagoas agora possuem tabela própria.`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  norte() {
    const topic = `Fique atento!`;
    const content = `O ESTADO DO AMAZONAS AGORA POSSUI TABELA PROPRIA`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  parana() {
    const topic = `Fique atento!`;
    const content = `O ESTADO DO PARANA AGORA POSSUI TABELA PROPRIA`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  spCapital() {
    const topic = `A seguir a relação das localidades que contemplam este plano`;
    const content = `Arujá, Barueri, Biritiba Mirim, Caieiras, Cajamar, Carapicuíba, Cotia, Diadema, Embu das Artes, Embu-Guaçu, Ferraz de Vasconcelos, Francisco Morato, Franco da Rocha, Guarulhos, Itapecerica da Serra, Itapevi, Itaquaquecetuba, Jandira, Juquitiba, Mairiporã, Mauá, Osasco, Pirapora do Bom Jesus, Poá, Ribeirão Pires, Rio Grande da Serra, Salesópolis, Santa Isabel, Santana de Parnaíba, Santo André, São Bernardo do Campo, São Caetano do Sul, São Lourenço da Serra, São Paulo, Suzano, Taboão da Serra e Vargem Grande Paulista.`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  spCapital2() {
    const topic = `A seguir a relação das localidades que contemplam este plano`;
    const content = `Estado de São Paulo, exceto municípios constantes na tabela São Paulo Capital e São Paulo Interior 1.`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
  spInterior1() {
    const topic = `A seguir a relação das localidades que contemplam este plano`;
    const content = `AGUAI, AGUAS DA PRATA, AGUAS DE LINDOIA, AGUAS DE SAO PEDRO, AJAPI, ALAMBARI, ALUMINIO, AMERICANA, AMPARO, ANA DIAS,ANGATUBA, APARECIDA, APARECIDA DE SAO MANUEL, APIAI, ARACARIGUAMA, ARACOIABA DA SERRA, ARAPEI, ARARAS, AREIAS, ARTEMIS, ARTUR NOGUEIRA, ATIBAIA, BANANAL, BARRA DO TURVO, BATATUBA, BERTIOGA, BIRITIBA-USSU, BOITUVA, BOM JESUS DOS PERDOES, BRAGANCA PAULISTA, BROTAS, BURI, CABREUVA, CACAPAVA, CACHOEIRA PAULISTA, CACONDE, CAIBURA, CAJATI, CAMPINA DO MONTE ALEGRE, CAMPINAS, CAMPO LIMPO PAULISTA, CAMPOS DO JORDAO, CANANEIA, CANAS, CAPAO BONITO, CAPELA DO ALTO, CAPIVARI, CARAGUATATUBA, CARDEAL, CARUARA, CASA BRANCA, CERQUILHO, CESARIO LANGE, CHARQUEADA, CIPO-GUACU, CONCHAL, CORDEIROPOLIS, CORUMBATAI, COSMOPOLIS, CRUZEIRO, CUBATAO, CUNHA, DIVINOLANDIA, ELDORADO, ELEUTERIO, ELIAS FAUSTO, ENGENHEIRO COELHO, ESPIRITO SANTO DO PINHAL, ESTIVA GERBI, FARTURA, GUAPIARA, GUARAPIRANGA, GUARAREMA, GUARATINGUETA, GUAREI, GUARIROBA, GUARUJA, HOLAMBRA, HOLAMBRA II, HORTOLANDIA, IBIUNA, IGARATA, IGUAPE, ILHA COMPRIDA, ILHA DIANA, ILHABELA, INDAIATUBA, INDAITUBA, IPERO, IPEUNA, IPORANGA, IRACEMAPOLIS, ITABERA, ITANHAEM, ITAOCA, ITAPETININGA, ITAPEUNA, ITAPEVA, ITAPIRA, ITAPORANGA, ITARARE, ITARIRI, ITATIBA, ITIRAPINA, ITOBI, ITU, ITUPEVA, JACARE, JACAREI, JACUBA, JACUPIRANGA, JAGUARIUNA, JAMBEIRO, JARINU, JOANOPOLIS, JORDANESIA, JUMIRIM, JUNDIAI, JUQUIA, LAGOINHA, LARANJAL PAULISTA, LAVRINHAS, LEME, LIMEIRA, LINDOIA, LORENA, LOUVEIRA, MAILASQUI, MAIRINQUE, MANDURI, MARESIAS, MARISTELA, MIRACATU, MOCOCA, MOGI DAS CRUZES, MOGI GUACU, MOGI MIRIM, MOMBUCA, MONGAGUA, MONTE ALEGRE DO SUL, MONTE CABRAO, MONTE MOR, MONTEIRO LOBATO, MORUNGABA, NATIVIDADE DA SERRA, NAZARE PAULISTA, NOSSA SENHORA DO REMEDIO, NOVA CAMPINA, NOVA ODESSA, PARAIBUNA, PARAISOLANDIA, PARIQUERA-ACU, PARURU, PAULINIA, PEDRA BELA, PEDREIRA, PEDRO BARROS, PEDRO DE TOLEDO, PEREIRAS, PERUIBE, PIEDADE, PILAR DO SUL, PINDAMONHANGABA, PINHALZINHO, PINHEIROS, PIQUETE, PIRACAIA, PIRACICABA, PIRAJU, PIRASSUNUNGA, POLVILHO, PORANGABA, PORTO FELIZ, PORTO FERREIRA, POTIM, PRAIA GRANDE, PRIMAVERA, QUADRA, QUELUZ, RAFARD, REDENCAO DA SERRA, REGISTRO, RIBEIRAO BRANCO, RIBEIRAO GRANDE, RIO CLARO, RIO DAS PEDRAS, ROSEIRA, SALTINHO, SALTO, SALTO DE PIRAPORA, SANTA BARBARA D'OESTE, SANTA BRANCA, SANTA CRUZ DA CONCEICAO, SANTA CRUZ DAS PALMEIRAS, SANTA GERTRUDES, SANTA MARIA DA SERRA, SANTO ANTONIO DE POSSE, SANTO ANTONIO DO JARDIM, SANTO ANTONIO DO PINHAL, SANTOS, SAO BENTO DO SAPUCAI, SAO FRANCISCO DA PRAIA, SAO FRANCISCO XAVIER, SAO JOAO DA BOA VISTA, SAO JOAO NOVO, SAO JOSE DO BARREIRO, SAO JOSE DO RIO PARDO, SAO JOSE DOS CAMPOS, SAO LUIZ DO PARAITINGA, SAO MIGUEL ARCANJO, SAO PEDRO, SAO ROQUE, SAO SEBASTIAO, SAO SEBASTIAO DA GRAMA, SAO VICENTE, SARAPUI, SERRA NEGRA, SETE BARRAS, SILVEIRAS, SOCORRO, SOROCABA, SUMARE, TAGUAI, TAMBAU, TAPIRAI, TAPIRATIBA, TAQUARITUBA, TAQUARIVAI, TATUI, TAUBATE, TEJUPA, TIETE, TORRE DE PEDRA, TORRINHA, TREMEMBE, TUIUTI, TURIBA DO SUL, UBATUBA, VALINHOS, VARGEM, VARGEM GRANDE DO SUL, VARZEA PAULISTA, VINHEDO E VOTORANTIM.`;
    Modal.insertTitleandContent(topic, content);
    Modal.showModal();
  },
};
// Modal
const Modal = {
  showModal() {
    const modal = document.querySelector('#ExemploModalCentralizado');
    modal.classList.add('modalShow');
    modal.classList.remove('fade');
  },
  closeModal() {
    const modal = document.querySelector('#ExemploModalCentralizado');
    modal.classList.remove('modalShow');
    modal.classList.add('fade');
  },
  insertTitleandContent(topic, content) {
    const titleModal = document.querySelector('#TituloModalCentralizado');
    titleModal.innerHTML = `${topic}`;

    const contentModal = document.querySelector('.modal-body');
    contentModal.innerHTML = `${content}`;
  },
};

const addOwner = {
  checkedFieldHolders() {
    const holdersRadio = document.getElementsByName('number_holders');
    const moreHolders = holdersRadio[1];
    const oneHolder = holdersRadio[0];
    if (moreHolders.checked) addOwner.enableButton();
    if (oneHolder.checked) addOwner.disableButton();
  },
  disableButton() {
    const buttonOwner = document.querySelector('[buttonAddOwner]');
    buttonOwner.setAttribute('disabled', 'disabled');
  },
  enableButton() {
    const buttonOwner = document.querySelector('[buttonAddOwner]');
    buttonOwner.removeAttribute('disabled');
  },
};

const cardBradesco = {
  addCard() {
    const fieldsBradesco = document.querySelectorAll('.transferBradesco');
    const newFieldBradesco = fieldsBradesco[
      fieldsBradesco.length - 1
    ].cloneNode(true);

    newFieldBradesco.children[1].value = '';
    if (newFieldBradesco.children.length > 2)
      newFieldBradesco.children[2].remove();

    fieldsBradesco[fieldsBradesco.length - 1].insertAdjacentElement(
      'afterend',
      newFieldBradesco
    );
  },
  addQtdLife() {
    const bradescolFields = document.querySelectorAll('.transferBradesco');
    const qtdLife = document.querySelector('#qtdLife');
    let count = 0;
    let bradesco;

    for (bradesco of bradescolFields) {
      if (bradesco.children[1].value != '') {
        count++;
        qtdLife.setAttribute('value', count);
      }
    }
  },
  zeroQtdLife() {
    const qtdLife = document.querySelector('#qtdLife');
    qtdLife.setAttribute('value', 0);
  },
  fieldBradescoShow() {
    const fieldBradesco = document.querySelector('.transferBradesco');
    fieldBradesco.style.display = '';
  },
  fieldBradescoHidden() {
    const fieldBradesco = document.querySelectorAll('.transferBradesco');
    let bradesco;

    for (bradesco of fieldBradesco) {
      if (bradesco.children.length > 2) {
        bradesco.style.display = 'none';
      } else {
        bradesco.remove();
      }
    }
  },
  showBradescoForm() {
    const bradescoSelect = document.querySelector('[bradesco]');

    const { value } = bradescoSelect[bradescoSelect.selectedIndex];

    switch (value) {
      case 'Sim':
        cardBradesco.fieldBradescoShow();
        break;
      case 'Não':
        cardBradesco.fieldBradescoHidden();
        cardBradesco.zeroQtdLife();
        break;
      default:
        break;
    }
  },
};

const planCheckbox = {
  planLimit(event) {
    // Função que só dixa selecionar 4 checkbox
    const plans = event.querySelectorAll('input');
    let plan;
    let count = 0;

    for (plan of plans) {
      if (plan.checked) count++;
    }
    if (count === 4) {
      for (plan of plans) {
        if (!plan.checked) plan.setAttribute('disabled', 'disabled');
      }
    }
    if (count < 4) {
      for (plan of plans) {
        plan.removeAttribute('disabled');
      }
    }
  },
};

const modalForm2 = {
  showModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('modalShow');
    modal.classList.remove('fade');
  },
  closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('modalShow');
    modal.classList.add('fade');
  },
  cleanInputs() {
    const tables = document.querySelectorAll('.ageGroupInput');
    let table;

    for (table of tables) {
      table.firstElementChild.value = '0';
    }
  },
};

function formPage2() {
  const form = document.querySelector('form');
  form.action = '/formpart2';
}

const Validate = {
  form1(event) {
    Validate.allFieldsRadio_form1();
    Validate.planType();
    Validate.checkFieldsText();
    Validate.selectOptionForm1();
    Validate.ageGroupForm1();

    const findFieldEmpty = document.querySelectorAll('.fieldEmpty');
    if (findFieldEmpty.length > 0) {
      alert('Preencha todos os campos corretamente.');
      event.preventDefault();
    }
  },
  form2(event) {
    Validate.checkFieldsText();
    Validate.allFieldsRadio_form2();
    Validate.quantityField();
    Validate.selectOptionForm2();
    Validate.ageGroupForm2();

    const findFieldEmpty = document.querySelectorAll('.fieldEmpty');
    if (findFieldEmpty.length > 0) {
      alert('Preencha todos os campos corretamente.');
      event.preventDefault();
    }
  },
  form3(event) {
    Validate.checkFieldsText();
    Validate.allFieldsRadio_form3();
    Validate.quantityField();
    Validate.selectOptionForm3();
    Validate.ageGroupForm3();

    const findFieldEmpty = document.querySelectorAll('.fieldEmpty');
    if (findFieldEmpty.length > 0) {
      alert('Preencha todos os campos corretamente.');
      event.preventDefault();
    }
    const qtdMinima = document.querySelectorAll('.minqtd');
    if (qtdMinima.length > 0) {
      alert('Quantidade Minima não selecionada.');
      event.preventDefault();
    }
  },
  form3Page2(event) {
    debugger;
    Validate.transferBradesco();
    Validate.professionalCategory();

    const findFieldEmpty = document.querySelectorAll('.fieldEmpty');
    if (findFieldEmpty.length > 0) {
      alert('Preencha todos os campos corretamente.');
      event.preventDefault();
    }
  },
  selectOptionForm1() {
    const ufDiv = document.querySelector('.uf');
    const options = ufDiv.children[1].children;
    let select = 0;

    for (const option of options) {
      if (option.value != 'empty' && option.selected) {
        select = 1;
      }
    }
    if (select != 1) {
      ufDiv.classList.add('fieldEmpty');
    } else if (ufDiv.classList.contains('fieldEmpty'))
      ufDiv.classList.remove('fieldEmpty');
  },
  selectOptionForm2() {
    const productDiv = document.querySelector('.product');
    const options = productDiv.children[1].children;
    let select = 0;

    for (const option of options) {
      if (option.value != 'empty' && option.selected) {
        select = 1;
      }
      if (select != 1) {
        productDiv.classList.add('fieldEmpty');
      } else if (productDiv.classList.contains('fieldEmpty'))
        productDiv.classList.remove('fieldEmpty');
    }
  },
  selectOptionForm3() {
    debugger;
    const networkDivs = document.querySelectorAll('.network');
    let options;
    let select = 0;
    let option;

    for (const networkDiv of networkDivs) {
      select = 0;
      options = networkDiv.children[1].children;

      for (option of options) {
        if (option.value != 'empty' && option.selected) {
          select = 1;
        }
        if (select != 1) {
          networkDiv.classList.add('fieldEmpty');
        } else if (networkDiv.classList.contains('fieldEmpty'))
          networkDiv.classList.remove('fieldEmpty');
      }
    }

    const accommodationDivs = document.querySelectorAll('.accommodation');

    for (const accommodationDiv of accommodationDivs) {
      select = 0;
      options = accommodationDiv.children[1].children;

      for (option of options) {
        if (option.value != 'empty' && option.selected) {
          select = 1;
        }
        if (select != 1) {
          accommodationDiv.classList.add('fieldEmpty');
        } else if (accommodationDiv.classList.contains('fieldEmpty'))
          accommodationDiv.classList.remove('fieldEmpty');
      }
    }
  },
  allFieldsRadio_form1() {
    const allRadiosForm1 = document.querySelectorAll(
      '.typeCnpj input,.type_contract input'
    );
    let radio;
    let count = 0;
    const divError = document.querySelector('.typeCnpj');
    // eslint-disable-next-line no-restricted-syntax
    for (radio of allRadiosForm1) {
      if (radio.checked) count += 1;
    }
    if (count < 2) {
      divError.classList.add('fieldEmpty');
    } else if (divError.classList.contains('fieldEmpty'))
      divError.classList.remove('fieldEmpty');
  },
  allFieldsRadio_form2() {
    const allRadiosForm2 = document.querySelectorAll(
      '.mei input,.coligation input'
    );
    let count = 0;
    let radio;

    const divError = document.querySelector('.mei');

    for (radio of allRadiosForm2) {
      if (radio.checked) count += 1;
    }

    if (count < 2) {
      divError.classList.add('fieldEmpty');
    } else if (divError.classList.contains('fieldEmpty'))
      divError.classList.remove('fieldEmpty');
  },
  allFieldsRadio_form3() {
    const allRadiosForm3 = document.querySelectorAll(
      '.acession input,.holders input'
    );
    let count = 0;
    let radio;

    const divError = document.querySelector('.acession');

    for (radio of allRadiosForm3) {
      if (radio.checked) count += 1;
    }
    if (count < 2) {
      divError.classList.add('fieldEmpty');
    } else if (divError.classList.contains('fieldEmpty'))
      divError.classList.remove('fieldEmpty');
  },

  quantityField() {
    const quantityField = document.querySelector('#quantityInputNumber');
    if (quantityField) {
      if (quantityField.lastElementChild.value === '') {
        quantityField.classList.add('fieldEmpty');
      } else if (quantityField.classList.contains('fieldEmpty'))
        quantityField.remove('fieldEmpty');
    }
  },
  planType() {
    const planType = document.querySelector('.plantype');
    let type;
    let checked = false;

    // eslint-disable-next-line no-restricted-syntax
    for (type of planType.children) {
      if (type.checked) checked = true;
    }

    if (!checked) planType.classList.add('fieldEmpty');
    else if (planType.classList.contains('fieldEmpty'))
      planType.classList.remove('fieldEmpty');
  },
  checkFieldsText() {
    // Verificando o campo Nome da Empresa
    const companyNameDiv = document.querySelector('.company_name');
    if (companyNameDiv.lastElementChild.value == '') {
      companyNameDiv.classList.add('fieldEmpty');
    } else if (companyNameDiv.classList.contains('fieldEmpty'))
      companyNameDiv.classList.remove('fieldEmpty');

    const cnpjDiv = document.querySelector('.cnpj');
    const values = cnpjDiv.lastElementChild.value.replace(/\D/g, '');
    if (values.length < 14) {
      cnpjDiv.classList.add('fieldEmpty');
    } else if (cnpjDiv.classList.contains('fieldEmpty'))
      cnpjDiv.classList.remove('fieldEmpty');

    const cepDiv = document.querySelector('.cep');
    if (cepDiv) {
      const values = cepDiv.lastElementChild.value.replace(/\D/g, '');
      if (values.length !== 8) {
        cepDiv.classList.add('fieldEmpty');
      } else if (cepDiv.classList.contains('fieldEmpty')) {
        cepDiv.classList.remove('fieldEmpty');
      }
    }
  },
  ageGroupForm1() {
    const error = false;
    let passed = false;
    const ageGroupDiv = document.querySelectorAll('.ageGroupContent');

    for (const div of ageGroupDiv) {
      passed = false;
      const ageGroups = div.querySelectorAll('.ageGroup,.secondAgeGroup');

      for (const ageGroup of ageGroups) {
        const inputAgeGroup = ageGroup.querySelectorAll('input[type=number]');

        for (const input of inputAgeGroup) {
          if (parseInt(input.value) > 0) {
            passed = true;
            break;
          }
        }

        if (!passed) {
          div.classList.add('fieldEmpty');
        } else {
          div.classList.remove('fieldEmpty');
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
  },
  ageGroupForm2() {
    let passed = false;
    const ageGroups = document.querySelectorAll('.ageGroup');
    const modalBodies = document.querySelectorAll('.modal-body');

    for (const ageGroup of ageGroups) {
      passed = false;
      const inputAgeGroup = ageGroup.querySelectorAll(
        '.ageGroupField input[type=number]'
      );
      for (const input of inputAgeGroup) {
        if (parseInt(input.value) > 0) {
          passed = true;
          break;
        }
      }
      if (!passed) {
        for (const modalBody of modalBodies) {
          const inputsModal = modalBody.querySelectorAll('input[type=number]');
          for (const inputModal of inputsModal) {
            if (parseInt(inputModal.value) > 0) {
              passed = true;
              break;
            }
          }
        }
      }

      if (!passed) {
        ageGroup.classList.add('fieldEmpty');
      } else {
        ageGroup.classList.remove('fieldEmpty');
      }
    }
  },
  ageGroupForm3() {
    debugger;
    const ageGroupDivs = document.querySelectorAll('.ageGroup');
    let passed = false;

    for (const ageGroupDiv of ageGroupDivs) {
      let personTotal = 0;
      passed = false;
      const ageGroupInputs = ageGroupDiv.querySelectorAll('input[type=number]');
      for (const input of ageGroupInputs) {
        if (parseInt(input.value) > 0) {
          personTotal += parseInt(input.value);
          passed = true;
          if (personTotal > 3){
            break;
          }
        }
      }

      if (!passed) {
        ageGroupDiv.classList.add('fieldEmpty');
      } else {
        ageGroupDiv.classList.remove('fieldEmpty');
      }

      if (personTotal < 3 ){
        ageGroupDiv.classList.add('minqtd');
      } else {
        ageGroupDiv.classList.remove('minqtd');
      }

      
    }
  },
  transferBradesco() {
    debugger;
    const transferBradescoDivs = document.querySelectorAll('.transferBradesco');
    let passed = false;

    if (transferBradescoDivs[0].style.display != 'none') {
      const inputs = document.querySelectorAll('.transferBradesco input');

      for (const input of inputs) {
        if (input.value != '') {
          passed = true;
          break;
        }
      }

      if (!passed) {
        transferBradescoDivs[0].classList.add('fieldEmpty');
      } else {
        transferBradescoDivs[0].classList.remove('fieldEmpty');
      }
    }
  },
  professionalCategory() {
    const professionalDiv = document.querySelector('.professionalCategory');
    const professionalInputs = professionalDiv.querySelectorAll('input');
    let passed = false;

    for (const input of professionalInputs) {
      passed = false;
      if (input.checked) {
        passed = true;
        break;
      }
    }

    if (!passed) {
      professionalDiv.classList.add('fieldEmpty');
    } else {
      professionalDiv.classList.remove('fieldEmpty');
    }
  },
};
