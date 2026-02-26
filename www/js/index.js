document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova جاهز للعمل');
    
    var toggle = document.getElementById('blockToggle');
    var statusLabel = document.getElementById('statusLabel');

    toggle.addEventListener('change', function() {
        if (this.checked) {
            statusLabel.innerText = "الحماية مفعلة";
            statusLabel.style.color = "#e74c3c";
            startMonitoring();
        } else {
            statusLabel.innerText = "الحماية متوقفة";
            statusLabel.style.color = "#7f8c8d";
            stopMonitoring();
        }
    });
}

function startMonitoring() {
    // ملاحظة: تحتاج لإضافة Cordova CallTrap Plugin لمراقبة الرقم الوارد
    window.plugins.CallTrap.onCall(function(state) {
        // state.number هو رقم المتصل
        if (state.type === 'ringing') {
            var number = state.number;
            if (number.startsWith("+") && !number.startsWith("+966")) { // استبدل 966 بكود بلدك
                console.log("حظر مكالمة دولية من: " + number);
                // كود إنهاء المكالمة يتطلب Plugin مخصص مثل 'cordova-plugin-intent' أو تعديل Java
            }
        }
    });
}
