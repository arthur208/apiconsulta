async function fetchData() {
  const tipo = document.getElementById('tipo').value;
  let documento = document.getElementById('documento').value;

  if (!tipo || !documento) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Remove caracteres não numéricos e converte para minúsculas
  documento = documento.replace(/\D/g, '').toLowerCase();
  console.log('Documento formatado:', documento); // Log para verificar o documento formatado

  try {
    // Cria a URL com o tipo e o documento
    const url = `https://api.searchlock.me/cck?tipo=${tipo}&token=66ec12f3cf10c&data=${documento}`;
    console.log('URL da API:', url); // Log da URL para depuração

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
      },
      mode: 'cors' // Adiciona modo CORS
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados da API:', data); // Log dos dados retornados
    displayData(data);
  } catch (error) {
    console.error('Erro:', error);
    alert(`Ocorreu um erro: ${error.message}`);
  }
}

function displayData(data) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = ''; // Limpa o conteúdo da tabela

  if (data.retorno === "OK") {
    let dados;
    if (document.getElementById('tipo').value === 'cpf') {
      dados = data.msg.credito.dados_pessoa_fisica;
    } else {
      dados = data.msg.credito.dados_pessoa_juridica;
    }

    if (dados) {
      const entries = Object.entries(dados);

      entries.forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${subKey}</td><td>${subValue}</td>`;
            tableBody.appendChild(row);
          });
        } else {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${key}</td><td>${value}</td>`;
          tableBody.appendChild(row);
        }
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="2">Nenhum dado encontrado.</td>`;
      tableBody.appendChild(row);
    }
  } else {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="2">Erro na consulta: ${data.msg}</td>`;
    tableBody.appendChild(row);
  }


  async function fetchData() {
    const tipo = document.getElementById('tipo').value;
    let documento = document.getElementById('documento').value;

    if (!tipo || !documento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Remove caracteres não numéricos e converte para minúsculas
    documento = documento.replace(/\D/g, '').toLowerCase();
    console.log('Documento formatado:', documento); // Log para verificar o documento formatado

    // Use um proxy CORS para contornar o problema
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.searchlock.me/cck?tipo=${tipo}&token=66ec12f3cf10c&data=${documento}`;
    const url = proxyUrl + apiUrl;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados da API:', data); // Log dos dados retornados
      displayData(data);
    } catch (error) {
      console.error('Erro:', error);
      alert(`Ocorreu um erro: ${error.message}`);
    }
  }





}