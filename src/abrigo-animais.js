// Lista fixa de animais, seus tipos e seus brinquedos favoritos
const animais = {
  Rex:   { tipo: 'cão',   brinquedos: ['RATO', 'BOLA'] },
  Mimi:  { tipo: 'gato',  brinquedos: ['BOLA', 'LASER'] },
  Fofo:  { tipo: 'gato',  brinquedos: ['BOLA', 'RATO', 'LASER'] },
  Zero:  { tipo: 'gato',  brinquedos: ['RATO', 'BOLA'] },
  Bola:  { tipo: 'cão',   brinquedos: ['CAIXA', 'NOVELO'] },
  Bebe:  { tipo: 'cão',   brinquedos: ['LASER', 'RATO', 'BOLA'] },
  Loco:  { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
};

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Quebra as strings de entrada em arrays
    const brinquedos1 = brinquedosPessoa1.split(',');
    const brinquedos2 = brinquedosPessoa2.split(',');
    const ordem = ordemAnimais.split(',');

    // Valida se todos os animais informados existem
    for (let nome of ordem) {
      if (!animais[nome]) {
        return { erro: 'Animal inválido' };
      }
    }

    // verificar se há animais duplicados
    const setAnimais = new Set(ordem);
    if (setAnimais.size !== ordem.length) {
      return { erro: 'Animal inválido' };
    }

    // Cria um conjunto com todos os brinquedos válidos (a partir da tabela de animais)
    const brinquedosValidos = new Set(
      Object.values(animais).flatMap(a => a.brinquedos)
    );

    // Função auxiliar para validar lista de brinquedos
    function validarBrinquedos(lista) {
      // Verifica duplicados
      const setB = new Set(lista);
      if (setB.size !== lista.length) {
        return false;
      }
      // Verifica se todos são válidos
      for (let b of lista) {
        if (!brinquedosValidos.has(b)) {
          return false;
        }
      }
      return true;
    }

    // Se alguma pessoa tiver brinquedos inválidos, retorna erro
    if (!validarBrinquedos(brinquedos1) || !validarBrinquedos(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

    // Função auxiliar: verifica se listaPessoa contém a sequência de listaAnimal em ordem
    function contemOrdem(listaPessoa, listaAnimal) {
      let i = 0;
      for (let brinquedo of listaPessoa) {
        if (brinquedo === listaAnimal[i]) {
          i++;
        }
        if (i === listaAnimal.length) {
          return true;
        }
      }
      return i === listaAnimal.length;
    }

    let resultado = [];   // vai guardar os resultados finais
    let adotadosP1 = 0;   // contador de quantos animais a pessoa 1 já adotou
    let adotadosP2 = 0;   // contador de quantos animais a pessoa 2 já adotou

    // Percorre todos os animais na ordem indicada
    for (let nome of ordem) {
      const animal = animais[nome];

      // Verifica se cada pessoa consegue atender à ordem de brinquedos do animal      
      let p1Ok = contemOrdem(brinquedos1, animal.brinquedos);
      let p2Ok = contemOrdem(brinquedos2, animal.brinquedos);

      // Regra especial: o Loco (jabuti) não liga pra ordem,
      // basta a pessoa ter pelo menos 1 dos brinquedos dele
      if (nome === 'Loco') {
        p1Ok = brinquedos1.some(b => animal.brinquedos.includes(b));
        p2Ok = brinquedos2.some(b => animal.brinquedos.includes(b));
      }

      let destino = 'abrigo'; // valor padrão, caso ninguém consiga adotar

      // Se apenas a pessoa 1 consegue e ela ainda não atingiu o limite de 3 animais
      if (p1Ok && !p2Ok) {
        if (adotadosP1 < 3) {
          destino = 'pessoa 1';
          adotadosP1++;
        } else {
          destino = 'abrigo';
        }

      // Se apenas a pessoa 2 consegue e ela ainda não atingiu o limite de 3 animais        
      } else if (p2Ok && !p1Ok) {
        if (adotadosP2 < 3) {
          destino = 'pessoa 2';
          adotadosP2++;
        } else {
          destino = 'abrigo';  // já atingiu o limite
        }
      }
      // Se as duas conseguem (empate) → vai pro abrigo (regra geral e regra dos gatos)

      resultado.push(`${nome} - ${destino}`);
    }

    // Retorna lista em ordem alfabética (como o desafio pediu)
    resultado.sort();
    return { lista: resultado };

  }
}

// Export mantém compatibilidade com os testes automáticos
export { AbrigoAnimais as AbrigoAnimais };
