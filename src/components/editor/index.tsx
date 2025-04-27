"use client";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditor from "react-froala-wysiwyg";

type EditorProps = {
    model: string;
    onModelChange: (content: string) => void;
};

export function Editor({ model, onModelChange }: EditorProps) {
    const config = {
        toolbarSticky: false,
        toolbarButtons: [
            "bold",
            "italic",
            "|",
            "paragraphFormat",
            "textColor",
            "|",
            "formatUL",
            "|",
            "undo",
            "redo",
        ],
        pluginsEnabled: ["colors", "paragraphFormat", "lists"],
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
        },
    };

    return (
        <FroalaEditor
            config={config}
            tag='textarea'
            model={model}
            onModelChange={onModelChange}
        />
    );
}
