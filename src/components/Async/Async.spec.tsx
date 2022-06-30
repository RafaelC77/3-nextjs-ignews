import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

test("it should render correctly", async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText("Hello World!")).toBeInTheDocument();
  //expect(await screen.findByText("Button")).not.toBeInTheDocument(); // Pode-se usar o not antes de qualquer método para negá-lo.

  /*   await waitFor(() => {
    return expect(screen.getByText("Button")).toBeInTheDocument();
  }); */

  await waitForElementToBeRemoved(screen.queryByText("Button"));
});

/*
    Os métodos Get funcionam de forma síncrona. Não vão esperar o elemento renderizar em tela.
Ou seja, retornará falso caso o elemento não renderize imediatamente.

    Já os métodos Query são assíncronos. Caso os elementos não renderizem imediatamente, não vão retornar falso.

TESTING PLAYGROUND

    Irá mostrar quais os métodos podem ser utilizados para testar os elementos.

COVARAGE REPORT

    Gera um relatório mostrando o percentual do código que está coberto pelos testes.
*/
