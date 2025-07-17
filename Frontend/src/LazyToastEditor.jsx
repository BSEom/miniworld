// src/components/LazyToastEditor.jsx
import React, { useState, Suspense } from 'react';

// Editor 컴포넌트만 lazy 로드
const ToastEditor = React.lazy(() =>
    import('@toast-ui/react-editor').then(mod => ({ default: mod.Editor }))
);

export default function LazyToastEditor({ initialValue = '', onChange }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            {/* ① 에디터를 토글할 버튼 */}
            {!visible && (
                <button onClick={() => setVisible(true)}>
                    에디터 열기
                </button>
            )}

            {/* ② 보이도록 설정되면 Suspense 안에서 lazy 로드 */}
            {visible && (
                <Suspense fallback={<div>에디터 로딩 중…</div>}>
                    <ToastEditor
                        initialValue={initialValue}
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={false}
                        plugins={[]}
                        onChange={() => {
                            const instance = ToastEditor.__getInstance?.()
                                || /* 혹은 */ document.querySelector('.toastui-editor').__toastUIEditor;
                            onChange && onChange(instance.getMarkdown());
                        }}
                    />
                </Suspense>
            )}
        </div>
    );
}
