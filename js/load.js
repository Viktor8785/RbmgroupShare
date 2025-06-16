export function loadData(page) {
  const params = {page: page};
  return fetch('https://app.worldcafe.ru/' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    }
  }).then(response => response.text());
}

