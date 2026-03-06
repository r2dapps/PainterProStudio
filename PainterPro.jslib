// PainterPro.jslib
// Place at: Assets/Plugins/PainterPro.jslib
//
// All three functions are called from C# via [DllImport("__Internal")].
// Message routing is handled here (InitJSBridge), NOT in unity.html.
// unity.html only loads Unity and sends UnityReady.

mergeInto(LibraryManager.library, {

    // ─────────────────────────────────────────────────────────────────
    // Called from C# ObjectSelector.Start()
    // Registers the message listener that routes browser → Unity commands.
    // Timing: Start() fires before unity.html sends UnityReady, so this
    // listener is in place before the parent ever flushes its queue.
    // ─────────────────────────────────────────────────────────────────
    InitJSBridge: function() {
        var gameObject = 'Main Camera';

        window.addEventListener('message', function(e) {
            var msg = e.data;
            if (!msg || msg.type !== 'FromParent') return;

            if (msg.action === 'SetMaterialColor' && msg.payload) {
                SendMessage(gameObject, 'SetMaterialColor', msg.payload);
            }
            else if (msg.action === 'SetMaterialTexture' && msg.payload) {
                SendMessage(gameObject, 'SetMaterialTexture', msg.payload);
            }
            else if (msg.action === 'SetTiling' && msg.payload) {
                SendMessage(gameObject, 'SetTiling', msg.payload);
            }
            else if (msg.action === 'SetRoughness' && msg.payload) {
                SendMessage(gameObject, 'SetRoughness', msg.payload);
            }
            else if (msg.action === 'SetMetallic' && msg.payload) {
                SendMessage(gameObject, 'SetMetallic', msg.payload);
            }
            else if (msg.action === 'RestoreOriginals') {
                SendMessage(gameObject, 'RestoreOriginals', '');
            }
            else if (msg.action === 'CaptureScreenshot') {
                SendMessage(gameObject, 'CaptureScreenshot', '');
            }
            else if (msg.action === 'LoadGLBFromUrl' && msg.payload) {
                SendMessage(gameObject, 'LoadGLBFromUrl', msg.payload);
            }
            else if (msg.action === 'LoadDefaultModel') {
                SendMessage(gameObject, 'LoadDefaultModel', '');
            }
        });

        console.log('[JSlib] InitJSBridge registered.');
    },

    // ─────────────────────────────────────────────────────────────────
    // Called from C# when user selects / deselects a 3D object.
    // name = "" and matCount = 0 means nothing is selected.
    // ─────────────────────────────────────────────────────────────────
    OnObjectSelected: function(name, matCount) {
        var nameStr = UTF8ToString(name);
        console.log('[JSlib] OnObjectSelected:', nameStr, '| slots:', matCount);
        window.parent.postMessage({
            type:     'FromUnity',
            action:   'ObjectSelected',
            payload:  nameStr,
            matCount: matCount
        }, '*');
    },

    // ─────────────────────────────────────────────────────────────────
    // Called from C# CaptureScreenshot coroutine to trigger a browser
    // file download of the PNG bytes rendered at 4× resolution.
    // array    = pointer into Unity HEAP (byte[])
    // size     = byte count
    // fileName = desired filename (e.g. "PainterPro_4K.png")
    // ─────────────────────────────────────────────────────────────────
    DownloadFile: function(array, size, fileName) {
        var fileNameStr = UTF8ToString(fileName);
        var bytes = new Uint8Array(Module.HEAPU8.buffer, array, size);
        var blob  = new Blob([bytes], { type: 'image/png' });
        var link  = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileNameStr;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }

});
