function validarEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function cadastrar() {
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;

  // Verificar se o email é válido
  if (!validarEmail(email)) {
    exibirPopup();
    console.error('Email inválido.');
    return; // Interromper o processo de envio dos dados
  }

  // Criar o objeto de dados
  var data = {
    nome: nome,
    email: email
  };

  // Enviar a solicitação POST usando a API Fetch
  fetch('http://localhost:3000/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
        console.log('Dados cadastrados com sucesso!');
        window.location.href = 'inicio.html';
      } else {
        console.error('Erro ao cadastrar os dados.');
      }
    })
    .catch(function(error) {
      console.error('Erro ao enviar a solicitação:', error);
    });
}

function exibirPopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  
  setTimeout(function() {
    popup.classList.add("hidden");
  }, 3000); // Oculta o popup depois de 3 segundos (3000 milissegundos)
}
