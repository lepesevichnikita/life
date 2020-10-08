import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import Cell from "./Cell";

describe("Cell", () => {
  let renderedCell: RenderResult;

  describe("Alive cell", () => {
    beforeEach(() => renderedCell = render(<Cell isAlive={true}/>));

    test("has Cell Class", () => {
      expect(renderedCell.container.firstChild).toHaveClass("Cell");
    })

    test('has Alive class', () => {
      expect(renderedCell.container.firstChild).toHaveClass("Alive");
    });
  });

  describe("Dead cell", () => {
    beforeEach(() => renderedCell = render(<Cell isAlive={false}/>));

    test("has Cell Class", () => {
      expect(renderedCell.container.firstChild).toHaveClass("Cell");
    })

    test('has no Alive class', () => {
      expect(renderedCell.container.firstChild).not.toHaveClass("Alive");
    });
  })

})

