import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Gato deve ir para o abrigo se duas pessoas conseguem', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      'BOLA,LASER',   // pessoa 1 consegue
      'BOLA,LASER',   // pessoa 2 também consegue
      'Mimi'          // gato
    );
    expect(resultado).toEqual({ lista: ['Mimi - abrigo'] });
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER', // pessoa 1 conseguiria vários
      'SKATE',                        // pessoa 2 quase nada
      'Rex,Bola,Bebe,Fofo'            // 4 animais
    );
    // pessoa 1 só pode ficar com 3 → o 4º vai pro abrigo
    expect(resultado).toEqual({
      lista: [
        'Bebe - pessoa 1',
        'Bola - pessoa 1',
        'Fofo - abrigo',
        'Rex - pessoa 1'
      ]
    });
  });

  test('Loco deve ir para quem tiver pelo menos um brinquedo dele', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      'SKATE,BOLA',  // pessoa 1 tem SKATE
      'LASER,RATO',  // pessoa 2 tem RATO
      'Loco'
    );
    // Como os dois conseguem, Loco vai pro abrigo
    expect(resultado).toEqual({ lista: ['Loco - abrigo'] });
  });

});
