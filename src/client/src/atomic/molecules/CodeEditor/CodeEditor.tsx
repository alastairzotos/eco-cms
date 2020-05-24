// tslint:disable:ordered-imports
import AceEditor, { IEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import * as React from 'react';
import { CodeEditorToolbar } from './Toolbar';

const DEFAULT_LIGHT_THEME = 'github';
const DEFAULT_DARK_THEME = 'terminal';

export interface ICodeEditorProps {
    id: string;
    theme: 'light' | 'dark';
    content: string | null;
    scroll?: number;
    dirty: boolean;
    saving: boolean;
    toolbar: React.ReactNode[];

    handleSave: () => void;
    handleScroll: (scroll: number) => void;
    handleChange: (value: string) => void;
}

export const CodeEditor: React.FC<ICodeEditorProps> = ({
    id,
    theme,
    content,
    scroll,
    dirty,
    saving,
    toolbar,
    handleSave,
    handleScroll,
    handleChange
}) => {
    const editorRef = React.useRef(null);

    const addSaveHandler = () => {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                handleSave();
            }
        }, false);
    };

    React.useEffect(() => {
        addSaveHandler();
    }, []);

    React.useEffect(() => {
        if (editorRef.current) {
            editorRef.current.renderer.scrollTop = scroll || 0;
        }
    }, [id]);

    const handleLoad = (editor: IEditorProps) => {
        editorRef.current = editor;
    };

    return (
        <>
            <CodeEditorToolbar
                dirty={dirty}
                saving={saving}
                handleSave={handleSave}
                items={toolbar}
            />

            <AceEditor
                mode="javascript"
                width="100%"
                height="calc(100% - 50px)"

                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}

                name={id}
                theme={theme === 'light' ? DEFAULT_LIGHT_THEME : DEFAULT_DARK_THEME}

                value={content}

                onLoad={handleLoad}
                onScroll={() => handleScroll(Math.floor(editorRef.current.env.document.$scrollTop))}
                onChange={handleChange}

                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 2,
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    scrollPastEnd: true
                }}
            />
        </>
    );
};
