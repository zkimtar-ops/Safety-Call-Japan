document.addEventListener('deviceready', onDeviceReady, false);

let isBlocking = false;

function onDeviceReady() {
    console.log('App is ready');
    // طلب الأذونات عند تشغيل التطبيق لأول مرة
    checkPermissions();
}

function toggleService() {
    isBlocking = !isBlocking;
    const statusDiv = document.getElementById('status');
    
    if (isBlocking) {
        statusDiv.innerText = "النظام: يعمل الآن ✅";
        statusDiv.style.color = "#2ecc71";
        startCallTrap();
    } else {
        statusDiv.innerText = "النظام: متوقف ❌";
        statusDiv.style.color = "#e94560";
    }
}

function startCallTrap() {
    // استخدام Plugin لمراقبة المكالمات
    if (window.CallTrap) {
        window.CallTrap.onCall(function(state) {
            // state: 'ringing', 'offhook', 'idle'
            if (state.type === 'ringing' && isBlocking) {
                let incomingNumber = state.number;
                
                // منطق الحظر: إذا بدأ بـ + ولم يكن كود دولتك (مثلاً السعودية +966)
                if (incomingNumber.startsWith('+') && !incomingNumber.startsWith('+966')) {
                    console.log("حظر مكالمة من: " + incomingNumber);
                    // ملاحظة: أندرويد الحديث يتطلب أن يكون التطبيق هو الافتراضي لرفض المكالمة
                    rejectCall();
                }
            }
        });
    }
}

function checkPermissions() {
    // الأذونات لا تظهر تلقائياً في أندرويد الحديث، يجب طلبها
    const permissions = cordova.plugins.permissions;
    const list = [
        permissions.READ_PHONE_STATE,
        permissions.READ_CALL_LOG,
        permissions.ANSWER_PHONE_CALLS
    ];

    permissions.requestPermissions(list, (status) => {
        if(!status.hasPermission) console.warn("الأذونات مرفوضة!");
    }, () => console.error("خطأ في طلب الأذونات"));
}

function rejectCall() {
    // محاكاة لرفض المكالمة - برمجياً تحتاج لإضافة Java مخصصة في Cordova
    // سأذكر لك أدناه كيف تضمن عملها
}
