'use client';

import { useState } from 'react';
import { Calendar, AlertTriangle, Plus, Trash2, Info, X } from 'lucide-react';
import { ScheduleFormData } from './ScheduleForm';

interface ScheduleExceptionsFormProps {
  formData: ScheduleFormData;
  onChange: (data: ScheduleFormData) => void;
  validationErrors: Record<string, string>;
}

interface ScheduleException {
  id?: string;
  exceptionDate: string;
  exceptionType: 'NO_SERVICE' | 'ADDITIONAL_SERVICE' | 'MODIFIED_SERVICE';
  description: string;
  alternativeSchedule?: {
    departureTime?: string;
    arrivalTime?: string;
    frequency?: number;
  };
}

export function ScheduleExceptionsForm({
  formData,
  onChange,
  validationErrors
}: ScheduleExceptionsFormProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingException, setEditingException] = useState<ScheduleException | null>(null);
  const [newException, setNewException] = useState<ScheduleException>({
    exceptionDate: '',
    exceptionType: 'NO_SERVICE',
    description: '',
    alternativeSchedule: {
      departureTime: '',
      arrivalTime: '',
      frequency: 0
    }
  });

  const exceptionTypes = [
    {
      value: 'NO_SERVICE',
      label: 'No Service',
      description: 'No buses will operate on this date',
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      value: 'ADDITIONAL_SERVICE',
      label: 'Additional Service',
      description: 'Extra buses or extended hours',
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      value: 'MODIFIED_SERVICE',
      label: 'Modified Service',
      description: 'Different timing or limited service',
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  ];

  const handleAddException = () => {
    setNewException({
      exceptionDate: '',
      exceptionType: 'NO_SERVICE',
      description: '',
      alternativeSchedule: {
        departureTime: '',
        arrivalTime: '',
        frequency: 0
      }
    });
    setEditingException(null);
    setShowAddModal(true);
  };

  const handleEditException = (exception: ScheduleException) => {
    setNewException({ ...exception });
    setEditingException(exception);
    setShowAddModal(true);
  };

  const handleSaveException = () => {
    if (!newException.exceptionDate || !newException.description) {
      return;
    }

    const exceptions = formData.scheduleExceptions || [];
    let updatedExceptions;

    if (editingException) {
      // Update existing exception
      updatedExceptions = exceptions.map(exc => 
        exc.id === editingException.id ? { ...newException } : exc
      );
    } else {
      // Add new exception
      const exceptionWithId = {
        ...newException,
        id: `temp_${Date.now()}`
      };
      updatedExceptions = [...exceptions, exceptionWithId];
    }

    onChange({
      ...formData,
      scheduleExceptions: updatedExceptions
    });

    setShowAddModal(false);
    setNewException({
      exceptionDate: '',
      exceptionType: 'NO_SERVICE',
      description: '',
      alternativeSchedule: {
        departureTime: '',
        arrivalTime: '',
        frequency: 0
      }
    });
    setEditingException(null);
  };

  const handleRemoveException = (exception: ScheduleException) => {
    const exceptions = formData.scheduleExceptions || [];
    const updatedExceptions = exceptions.filter(exc => exc.id !== exception.id);
    
    onChange({
      ...formData,
      scheduleExceptions: updatedExceptions
    });
  };

  const handleCancelModal = () => {
    setShowAddModal(false);
    setEditingException(null);
    setNewException({
      exceptionDate: '',
      exceptionType: 'NO_SERVICE',
      description: '',
      alternativeSchedule: {
        departureTime: '',
        arrivalTime: '',
        frequency: 0
      }
    });
  };

  const getExceptionTypeConfig = (type: string) => {
    return exceptionTypes.find(et => et.value === type) || exceptionTypes[0];
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    } catch {
      return dateString;
    }
  };

  const exceptions = formData.scheduleExceptions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Schedule Exceptions
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Define special rules for dates when the regular schedule doesn't apply.
          This includes holidays, special events, or service modifications.
        </p>
      </div>

      {/* Add Exception Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {exceptions.length} exception{exceptions.length !== 1 ? 's' : ''} configured
        </div>
        <button
          type="button"
          onClick={handleAddException}
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Exception
        </button>
      </div>

      {/* Validation Error */}
      {validationErrors.scheduleExceptions && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-red-600">{validationErrors.scheduleExceptions}</p>
          </div>
        </div>
      )}

      {/* Exceptions List */}
      <div className="space-y-4">
        {exceptions.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Calendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">No exceptions configured</h4>
            <p className="text-sm text-gray-500 mb-4">
              Add schedule exceptions for holidays, special events, or service modifications
            </p>
            <button
              type="button"
              onClick={handleAddException}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Exception
            </button>
          </div>
        ) : (
          exceptions.map((exception) => {
            const typeConfig = getExceptionTypeConfig(exception.exceptionType);
            
            return (
              <div
                key={exception.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-lg font-medium text-gray-900">
                        {formatDate(exception.exceptionDate)}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {exception.description}
                    </p>
                    
                    {exception.exceptionType === 'MODIFIED_SERVICE' && exception.alternativeSchedule && (
                      <div className="bg-gray-50 rounded-md p-3">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Alternative Schedule</h5>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {exception.alternativeSchedule.departureTime && (
                            <div>
                              <span className="text-gray-600">Departure:</span>
                              <span className="ml-1 font-medium">{exception.alternativeSchedule.departureTime}</span>
                            </div>
                          )}
                          {exception.alternativeSchedule.arrivalTime && (
                            <div>
                              <span className="text-gray-600">Arrival:</span>
                              <span className="ml-1 font-medium">{exception.alternativeSchedule.arrivalTime}</span>
                            </div>
                          )}
                          {exception.alternativeSchedule.frequency && (
                            <div>
                              <span className="text-gray-600">Frequency:</span>
                              <span className="ml-1 font-medium">{exception.alternativeSchedule.frequency} min</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      type="button"
                      onClick={() => handleEditException(exception)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                      title="Edit exception"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveException(exception)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Remove exception"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          Schedule Exception Guidelines
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>No Service:</strong> Completely suspend bus operations on specified dates</li>
          <li>• <strong>Additional Service:</strong> Add extra trips or extend operating hours</li>
          <li>• <strong>Modified Service:</strong> Change regular timing or provide limited service</li>
          <li>• Schedule exceptions override regular calendar rules for specific dates</li>
        </ul>
      </div>

      {/* Add/Edit Exception Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {editingException ? 'Edit Schedule Exception' : 'Add Schedule Exception'}
              </h3>
              <button
                type="button"
                onClick={handleCancelModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              {/* Exception Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exception Date *
                </label>
                <input
                  type="date"
                  value={newException.exceptionDate}
                  onChange={(e) => setNewException({ ...newException, exceptionDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Exception Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exception Type *
                </label>
                <select
                  value={newException.exceptionType}
                  onChange={(e) => setNewException({ 
                    ...newException, 
                    exceptionType: e.target.value as ScheduleException['exceptionType']
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {exceptionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={newException.description}
                  onChange={(e) => setNewException({ ...newException, description: e.target.value })}
                  rows={3}
                  placeholder="Describe the reason for this exception (e.g., Public Holiday, Special Event, etc.)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Alternative Schedule (for Modified Service) */}
              {newException.exceptionType === 'MODIFIED_SERVICE' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Schedule Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Departure Time
                      </label>
                      <input
                        type="time"
                        value={newException.alternativeSchedule?.departureTime || ''}
                        onChange={(e) => setNewException({
                          ...newException,
                          alternativeSchedule: {
                            ...newException.alternativeSchedule,
                            departureTime: e.target.value
                          }
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        value={newException.alternativeSchedule?.arrivalTime || ''}
                        onChange={(e) => setNewException({
                          ...newException,
                          alternativeSchedule: {
                            ...newException.alternativeSchedule,
                            arrivalTime: e.target.value
                          }
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Frequency (min)
                      </label>
                      <input
                        type="number"
                        value={newException.alternativeSchedule?.frequency || ''}
                        onChange={(e) => setNewException({
                          ...newException,
                          alternativeSchedule: {
                            ...newException.alternativeSchedule,
                            frequency: parseInt(e.target.value) || 0
                          }
                        })}
                        min="0"
                        max="1440"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveException}
                disabled={!newException.exceptionDate || !newException.description}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingException ? 'Update Exception' : 'Add Exception'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}