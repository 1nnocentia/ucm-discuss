// import { PendingUpload } from '@/context/PendingUploadsContext';
// import { retryPendingUpload } from './createThreadService';

// export const startBackgroundRetryService = (
//     pendingUploads: PendingUpload[],
//     onRemoveUpload: (id: string) => Promise<void>,
//     onUpdateRetryCount: (id: string, count: number) => Promise<void>
// ) => {
//     // Retry semua pending uploads
//     pendingUploads.forEach((upload) => {
//         retryUploadWithDelay(upload, onRemoveUpload, onUpdateRetryCount);
//     });
// };

// const retryUploadWithDelay = async (
//     upload: PendingUpload,
//     onRemoveUpload: (id: string) => Promise<void>,
//     onUpdateRetryCount: (id: string, count: number) => Promise<void>
// ) => {
//     try {
//         const success = await retryPendingUpload(upload, onUpdateRetryCount);
        
//         if (success) {
//             // Upload berhasil, remove dari pending
//             await onRemoveUpload(upload.id);
//             console.log(`Upload ${upload.id} berhasil di-remove dari pending`);
//         } else {
//             // Retry gagal, akan di-retry lagi sesuai retryCount
//             console.log(`Upload ${upload.id} akan di-retry lagi`);
//         }
//     } catch (error) {
//         console.error(`Error di background retry service:`, error);
//     }
// };

// export const setupBackgroundRetryListener = (
//     pendingUploads: PendingUpload[],
//     onRemoveUpload: (id: string) => Promise<void>,
//     onUpdateRetryCount: (id: string, count: number) => Promise<void>
// ) => {
//     // Setup interval untuk check dan retry pending uploads setiap 30 detik
//     const intervalId = setInterval(() => {
//         if (pendingUploads.length > 0) {
//             console.log(`Checking ${pendingUploads.length} pending uploads...`);
//             startBackgroundRetryService(pendingUploads, onRemoveUpload, onUpdateRetryCount);
//         }
//     }, 30000); // 30 detik

//     // Return cleanup function
//     return () => clearInterval(intervalId);
// };
