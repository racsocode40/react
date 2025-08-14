import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { vi } from 'vitest';

describe('App form', () => {
  test('renders all form fields', () => {
    render(<App />);
    expect(screen.getByLabelText(/texto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/acepto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/masculino/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/femenino/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/país/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/provincia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/activado/i)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText(/subir archivo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  test('allows typing and submitting', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByLabelText(/texto/i), { target: { value: 'hola' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'secreto1' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: '1234567890' } });
    fireEvent.submit(screen.getByRole('button', { name: /enviar/i }).closest('form'));
    expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({ text: 'hola' }));
    logSpy.mockRestore();
  });

  test('collects submitted values', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByLabelText(/texto/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'secreto1' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByLabelText(/acepto/i));
    fireEvent.click(screen.getByLabelText(/femenino/i));

    fireEvent.mouseDown(screen.getByLabelText(/país/i));
    let listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/España/i));

    fireEvent.mouseDown(screen.getByLabelText(/provincia/i));
    listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/Madrid/i));
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'abc',
        email: 'a@b.com',
        checkbox: 'on',
        gender: 'female',
        country: 'es',
        province: 'Madrid',
      })
    );
    logSpy.mockRestore();
  });
});

