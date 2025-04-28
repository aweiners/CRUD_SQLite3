import { useState } from 'react';

function Forms({ users }) {
  console.log("Users in Forms component:", users);

  if (!users || !Array.isArray(users) || users.length === 0) {
    return <p className="p-4">No students found.</p>;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="p-4  border rounded shadow-lg bg-gray-100">
            <p className="font-bold"><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.first_name} {user.middle_name || ''} {user.last_name} {user.suffix || ''}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Birthdate:</strong> {user.birthdate}</p>
            <p><strong>Nationality:</strong> {user.nationality}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>School:</strong> {user.school_name}</p>
            <p><strong>Program Choices:</strong> {user.program_choice_1}, {user.program_choice_2}, {user.program_choice_3}</p>
            <p><strong>Payment:</strong> {user.payment ? 
  <a href={user.payment} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
    View Payment Receipt
  </a> : 
  'No payment uploaded'}
</p>
            <p><strong>Exam Date:</strong> {user.exam_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forms;