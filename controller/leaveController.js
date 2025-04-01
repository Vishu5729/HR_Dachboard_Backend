import Leave from '../model/leave.js';
import Employee from '../model/employes.js';
import fs from 'fs/promises';
import path from 'path';

export const requestLeave = async (req, res, next) => {
  try {
    const { employeeId, employeeName, designation, leaveDate, reason } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee || employee.status !== 'Present') {
      return res.status(400).json({ message: 'Only present employees can apply' });
    }

    // Handle document upload
    if (!req.file) {
      return res.status(400).json({ message: 'Document PDF is required' });
    }

    // Format document URL to be relative to the uploads directory
    const documentUrl = `/uploads/documents/${path.basename(req.file.path)}`;

    const leaveRequest = await Leave.create({
      employeeId,
      employeeName,
      designation,
      leaveDate,
      reason,
      documentUrl,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      data: leaveRequest,
      message: 'Leave request created successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const getAllLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find().populate('employeeId');
    res.status(200).json({
      success: true,
      data: { leaves },
      message: 'Leaves fetched successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const updateLeaveStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('employeeId');

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: leave,
      message: 'Leave status updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const getApprovedLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ status: 'Approved' }).populate('employeeId');
    res.status(200).json({
      success: true,
      data: { leaves },
      message: 'Approved leaves fetched successfully'
    });
  } catch (err) {
    next(err);
  }
};
