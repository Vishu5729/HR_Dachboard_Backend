import Candidate from '../model/candidates.js';
import Employee from '../model/employes.js';
import fs from 'fs/promises';
import path from 'path';

export const createCandidate = async (req, res, next) => {
  try {
    const { name, email, phone, experience, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF is required' });
    }

    const resumePath = req.file.path.replace(/\\/g, '/'); // fix Windows paths

    const newCandidate = await Candidate.create({
      name,
      email,
      phone,
      experience,
      position,
      resume: resumePath, // ✅ Just the path string
    });

    res.status(201).json(newCandidate);
  } catch (err) {
    next(err);
  }
};



export const getCandidates = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};


export const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, experience, position } = req.body;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        experience,
        position
      },
      { new: true }
    );

    res.json(updatedCandidate);
  } catch (err) {
    next(err);
  }
};

export const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

   
    await Candidate.findByIdAndDelete(id);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const promoteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // ✅ Only promote if status === "Selected"
    if (req.body.status === 'Selected') {
      const { name, email, phone, position, experience, createdAt } = candidate;

      const newEmployee = new Employee({
        name,
        email,
        phone,
        position: "Intern",
        department: position, // ✅ candidate.position becomes department
        experience,
        status: "Present",
        date_of_joining: new Date(createdAt),
      });

      await newEmployee.save();
      await Candidate.findByIdAndDelete(req.params.id);

      return res.status(201).json({
        message: 'Candidate promoted to employee and removed from candidates list.',
        employee: newEmployee,
      });
    }

    // ❌ If status is not 'Selected', do nothing (or optionally update status)
    return res.status(400).json({ message: 'Candidate must be selected to promote.' });

  } catch (err) {
    console.error('Promotion error:', err);
    next(err);
  }
};


