import { render, screen } from '@testing-library/react';
import TeacherDashboard from './TeacherDashboard';

test('renders learn react link', () => {
  render(<TeacherDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
