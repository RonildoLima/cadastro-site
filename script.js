function cadastrar() {
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;

  // Criar o objeto de dados
  var data = {
    nome: nome,
    email: email
  };

  // Enviar a solicitação POST usando a API Fetch
  fetch('https://voluble-travesseiro-3e9e2f.netlify.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
        console.log('Dados cadastrados com sucesso!');
      } else {
        console.error('Erro ao cadastrar os dados.');
      }
    })
    .catch(function(error) {
      console.error('Erro ao enviar a solicitação:', error);
    });
}
