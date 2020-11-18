/* eslint-disable no-param-reassign */
function createReqWithAgeGroup(req) {
  const arrayPlans = Object.values(req.plans);

  const ageGroup59 = arrayPlans.map(item => {
    const age = item.ageGroups.age ? item.ageGroups.age : null;
    const qtd = item.ageGroups.qtd ? item.ageGroups.qtd : null;
    let ageGroup;
    if (age) {
      let ageCount;
      if (!Array.isArray(age)) {
        ageCount = [age];
      } else {
        ageCount = age;
      }
      ageGroup = ageCount.map((i, v) => {
        return { title: i, value: qtd[v] };
      });
    }

    item.ageGroups.age59 = ageGroup;

    return item;
  });

  req.plans = ageGroup59;

  return req;
}

function createObjectDataAge(groups) {
  const ObjectOfGroup = groups.map(item => {
    const group = Object.entries(item.ageGroups);

    if (item.ageGroups.age59) {
      item.ageGroups.age59.map(i => group.push([i.title, i.value]));
    }

    group.unshift(['Plano', item.name]);

    const groupFinish = group.map(i => ({
      title: i[0],
      value: i[1],
    }));

    item.ageGroups = groupFinish;

    return item;
  });
  return ObjectOfGroup;
}

function createObjectDataProfile(profiles) {
  const objectProfile = profiles.map(item => {
    const group = Object.entries(item.ageGroups);

    group.unshift(['Acomodação', item.accommodation]);
    group.unshift(['Região', item.region]);
    group.unshift(['Rede', item.network]);

    const groupFinish = group.map(i => ({
      title: i[0],
      value: i[1],
    }));
    item.ageGroups = groupFinish;
    return item;
  });

  return objectProfile;
}
function getGroupValues(groups) {
  const newGroupArray = groups.map(item => item.ageGroups);

  const arrayWithout59 = newGroupArray.map(item =>
    item.filter(
      i => i.title !== 'qtd' && i.title !== 'age' && i.title !== 'age81'
    )
  );

  return [...arrayWithout59.map(item => item.map(i => i.value))];
}

function getGroupTitle(groups) {
  const newGroupArray = groups.map(item => item.ageGroups);

  const arrayWithout59 = newGroupArray.map(item =>
    item.filter(
      i => i.title !== 'qtd' && i.title !== 'age' && i.title !== 'age81'
    )
  );

  return [...arrayWithout59.map(item => item.map(i => i.title))];
}

function createAgeGroupCrv(ageGroupTitle, ageGroupValue) {
  const newArray = [];

  ageGroupTitle.map((item, index) => newArray.push(item, ageGroupValue[index]));

  // ageGroupTitle.map(item => item.map(i => newArray.push(i, ',')));
  return newArray;
}

function getGroupTitleSameLine(ageGroupTitle) {
  const newArray = [];
  ageGroupTitle.map(item => item.map(i => newArray.push(i)));
  return newArray;
}

function getGroupValueSameLine(ageGroupValue) {
  const newArray = [];
  ageGroupValue.map(item => item.map(i => newArray.push(i)));
  return newArray;
}
module.exports = {
  getGroupValues,
  getGroupTitle,
  createReqWithAgeGroup,
  createObjectDataAge,
  createAgeGroupCrv,
  getGroupTitleSameLine,
  createObjectDataProfile,
  getGroupValueSameLine,
};
