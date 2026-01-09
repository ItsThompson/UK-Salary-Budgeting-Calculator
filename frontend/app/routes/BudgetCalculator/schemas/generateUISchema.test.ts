import { generateUISchema } from './generateUISchema';
import type { Layout } from '@jsonforms/core';

describe('generateUISchema', () => {
  it('generates valid UI schema structure', () => {
    const uiSchema = generateUISchema() as Layout;
    
    expect(uiSchema.type).toBe('VerticalLayout');
    expect(uiSchema.elements).toBeDefined();
    expect(Array.isArray(uiSchema.elements)).toBe(true);
  });

  it('includes all required form sections', () => {
    const uiSchema = generateUISchema() as Layout;
    const labels = uiSchema.elements?.map((el: any) => el.label);
    
    expect(labels).toContain('Salary Information');
    expect(labels).toContain('Bonuses');
    expect(labels).toContain('Stock Grants');
    expect(labels).toContain('Tax Settings');
    expect(labels).toContain('Monthly Expenses');
  });
});
