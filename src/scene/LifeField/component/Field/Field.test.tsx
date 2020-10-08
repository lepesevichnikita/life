import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import Field from "./Field";

describe("Field", () => {
  let renderedField: RenderResult;

  describe("with some dead and alive cells", () => {
    const generation: Array<Array<boolean>> = [
      [true, false, false, false],
      [false, true, false, true],
      [false, false, true, false]
    ];
    beforeEach(() => renderedField = render(<Field generation={generation}/>));

    test("has Field Class", () => {
      expect(renderedField.container.firstChild).toHaveClass("Field");
    })

    test('has 3 rows', () => {
      const rows: number = renderedField.container.firstChild.childNodes;
      expect(rows).toHaveLength(3);
    });

    test('has 4 columns', () => {
      const columns: number = renderedField.container.firstChild.childNodes[0].childNodes;
      expect(columns).toHaveLength(4);
    });
  });
})