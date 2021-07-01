export function createFetchBody(data) {
  const types = data.getAll('contact-type');
  const values = data.getAll('contact-value');
  const contacts = [];

  types.forEach((type, index) => {
    contacts.push({
      type,
      value: values[index],
    });
  });

  return {
    name: data.get('name'),
    surname: data.get('surname'),
    lastName: data.get('lastName'),
    contacts,
  };
}
