'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Trash2, ArrowLeft, Bus, User, Settings } from 'lucide-react';
import { BusResponse } from '@/lib/api-client/route-management';

interface DeleteBusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    bus: BusResponse | null;
    isDeleting?: boolean;
    tripCount?: number; // Number of trips associated with this bus
}

export default function DeleteBusModal({
    isOpen,
    onClose,
    onConfirm,
    bus,
    isDeleting = false,
    tripCount = 0,
}: DeleteBusModalProps) {
    const [confirmText, setConfirmText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const requiredText = 'DELETE';
    const isConfirmValid = confirmText === requiredText;

    // Handle modal animation
    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Reset form when closing
            setConfirmText('');
            document.body.style.overflow = 'unset';

            // Delay hiding to allow exit animation
            const timer = setTimeout(() => setShowModal(false), 300);
            return () => clearTimeout(timer);
        }

        // Cleanup function to restore scroll
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen && !isDeleting) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, isDeleting, onClose]);

    const handleConfirm = async () => {
        if (!isConfirmValid || isDeleting) return;
        await onConfirm();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isDeleting) {
            onClose();
        }
    };

    if (!showModal) return null;

    // Get status color and label
    const getStatusInfo = (status?: string) => {
        switch (status) {
            case 'active':
                return { label: 'Active', color: 'text-green-600 bg-green-50 border-green-200' };
            case 'pending':
                return { label: 'Pending', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
            case 'inactive':
                return { label: 'Inactive', color: 'text-red-600 bg-red-50 border-red-200' };
            case 'cancelled':
                return { label: 'Cancelled', color: 'text-gray-600 bg-gray-50 border-gray-200' };
            default:
                return { label: status || 'Unknown', color: 'text-gray-600 bg-gray-50 border-gray-200' };
        }
    };

    // Parse facilities to show enabled ones
    const parseFacilities = (facilities: any): string[] => {
        if (!facilities) return [];

        try {
            let facilitiesObj: { [key: string]: boolean } = {};

            if (typeof facilities === 'string') {
                facilitiesObj = JSON.parse(facilities);
            } else if (typeof facilities === 'object' && facilities !== null) {
                facilitiesObj = facilities;
            }

            return Object.entries(facilitiesObj)
                .filter(([key, value]) => Boolean(value))
                .map(([key, value]) => formatFacilityName(key));
        } catch (error) {
            return [];
        }
    };

    const formatFacilityName = (key: string): string => {
        const facilityLabels: { [key: string]: string } = {
            'ac': 'Air Conditioning',
            'wifi': 'WiFi',
            'cctv': 'CCTV Cameras',
            'gps': 'GPS Tracking',
            'audio_system': 'Audio System',
            'charging_ports': 'Charging Ports',
            'wheelchair_accessible': 'Wheelchair Accessible',
            'air_suspension': 'Air Suspension',
            'toilet': 'Toilet',
            'tv_screens': 'TV Screens',
            'reading_lights': 'Reading Lights',
            'seat_belts': 'Seat Belts',
            'emergency_exits': 'Emergency Exits',
            'fire_extinguisher': 'Fire Extinguisher'
        };

        return facilityLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const statusInfo = getStatusInfo(bus?.status);
    const enabledFacilities = parseFacilities(bus?.facilities);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                onClick={handleBackdropClick}
            />

            {/* Modal */}
            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <div
                    className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex h-full flex-col bg-white shadow-xl">
                        {/* Header */}
                        <div className="bg-white px-8 py-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Delete Bus
                                        </h3>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    disabled={isDeleting}
                                    className="rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-8 py-8">
                            <div className="space-y-6">
                                {/* Critical Warning Message */}
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <h4 className="text-sm font-medium text-red-800">
                                                ⚠️ Critical Action - Cannot be undone
                                            </h4>
                                            <p className="text-sm text-red-700 mt-1">
                                                This will permanently delete the bus and remove all associated data from the system.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bus Details */}
                                {bus && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                                            <Bus className="w-4 h-4 mr-2" />
                                            Bus to be deleted:
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Plate Number:</span>
                                                <span className="ml-2 text-sm text-gray-900 font-medium">
                                                    {bus.plateNumber || 'Not assigned'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">NTC Registration:</span>
                                                <span className="ml-2 text-sm text-gray-900 font-medium">
                                                    {bus.ntcRegistrationNumber || 'Not assigned'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Bus ID:</span>
                                                <span className="ml-2 text-sm font-mono text-gray-600">{bus.id}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Model:</span>
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {bus.model || 'Not specified'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Capacity:</span>
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {bus.capacity ? `${bus.capacity} passengers` : 'Not specified'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Operator:</span>
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {bus.operatorName || 'Not assigned'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700">Status:</span>
                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </div>
                                            </div>
                                            {bus.createdAt && (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Created:</span>
                                                    <span className="ml-2 text-sm text-gray-900">
                                                        {new Date(bus.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Facilities Information */}
                                {enabledFacilities.length > 0 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Bus Facilities ({enabledFacilities.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {enabledFacilities.map((facility, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {facility}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Associated Trips Warning */}
                                {tripCount > 0 && (
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-orange-800 mb-2 flex items-center">
                                            <User className="w-4 h-4 mr-2" />
                                            Associated Trips Warning
                                        </h4>
                                        <p className="text-sm text-orange-700">
                                            This bus has <strong>{tripCount}</strong> trip{tripCount !== 1 ? 's' : ''} associated with it.
                                            Deleting this bus will also remove all trip assignments and their data.
                                        </p>
                                    </div>
                                )}

                                {/* Potential Impact Warning */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                                        <Settings className="w-4 h-4 mr-2" />
                                        System Impact
                                    </h4>
                                    <ul className="text-sm text-amber-700 space-y-1">
                                        <li>• All trip assignments for this bus will be deleted</li>
                                        <li>• Route schedules and operational data will be affected</li>
                                        <li>• Service permits and registrations will be invalidated</li>
                                        <li>• Historical operational data will be permanently lost</li>
                                        <li>• Passenger service records may be impacted</li>
                                        <li>• Financial records and transactions will be affected</li>
                                        <li>• GPS tracking and maintenance records will be lost</li>
                                    </ul>
                                </div>

                                {/* Alternative Actions Suggestion */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                                        Consider Alternative Actions
                                    </h4>
                                    <p className="text-sm text-blue-700 mb-2">
                                        Instead of deleting, you might want to:
                                    </p>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Change status to "Inactive" to suspend operations</li>
                                        <li>• Transfer ownership to another operator</li>
                                        <li>• Update bus information if details have changed</li>
                                        <li>• Archive the bus for future reference</li>
                                        <li>• Complete ongoing trips before removal</li>
                                    </ul>
                                </div>

                                {/* Confirmation Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type <span className="font-mono bg-gray-100 px-1 rounded">{requiredText}</span> to confirm deletion:
                                    </label>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        placeholder={`Type "${requiredText}" to confirm`}
                                        disabled={isDeleting}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:opacity-50"
                                        autoComplete="off"
                                    />
                                    {confirmText && !isConfirmValid && (
                                        <p className="mt-1 text-sm text-red-600">
                                            Please type exactly "{requiredText}" to confirm
                                        </p>
                                    )}
                                </div>

                                {/* Final Warning */}
                                {isConfirmValid && (
                                    <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                                        <p className="text-sm text-red-800 text-center font-medium">
                                            ⚠️ You are about to permanently delete this bus and all associated data.
                                            This action cannot be reversed.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={onClose}
                                    disabled={isDeleting}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={!isConfirmValid || isDeleting}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Deleting Bus...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Bus
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}