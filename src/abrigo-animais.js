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
    const brinquedos1 = brinquedosPessoa1.split(',');
    const brinquedos2 = brinquedosPessoa2.split(',');
    const ordem = ordemAnimais.split(',');

    // verificar se todos os animais da ordem existem
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

    const brinquedosValidos = new Set(
      Object.values(animais).flatMap(a => a.brinquedos)
    );

    function validarBrinquedos(lista) {
      // duplicados
      const setB = new Set(lista);
      if (setB.size !== lista.length) {
        return false;
      }
      // inválidos
      for (let b of lista) {
        if (!brinquedosValidos.has(b)) {
          return false;
        }
      }
      return true;
    }

    if (!validarBrinquedos(brinquedos1) || !validarBrinquedos(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

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

    let resultado = [];
    let adotadosP1 = 0;
    let adotadosP2 = 0;

    for (let nome of ordem) {
      const animal = animais[nome];
      let p1Ok = contemOrdem(brinquedos1, animal.brinquedos);
      let p2Ok = contemOrdem(brinquedos2, animal.brinquedos);

      // Regra especial do Loco
      if (nome === 'Loco') {
        p1Ok = brinquedos1.some(b => animal.brinquedos.includes(b));
        p2Ok = brinquedos2.some(b => animal.brinquedos.includes(b));
      }

      let destino = 'abrigo';

      if (p1Ok && !p2Ok && adotadosP1 < 3) {
        destino = 'pessoa 1';
        adotadosP1++;
      } else if (p2Ok && !p1Ok && adotadosP2 < 3) {
        destino = 'pessoa 2';
        adotadosP2++;
      } else if (p1Ok && p2Ok) {
        destino = 'abrigo'; // empate
      }

      resultado.push(`${nome} - ${destino}`);
    }

    resultado.sort();
    return { lista: resultado };

  }
}

export { AbrigoAnimais as AbrigoAnimais };
