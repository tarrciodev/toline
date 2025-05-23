/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect } from "react";
import "../../styles/_keyframe-animations.scss";
import "../../styles/_variables.scss";
import { Toolbar, ToolbarGroup } from "../editor/tiptap-ui-primitive/toolbar";
import { ListDropdownMenu } from "../editor/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "../editor/tiptap-ui/mark-button";
import { UndoRedoButton } from "../editor/tiptap-ui/undo-redo-button";

export function Editor({ field, clear }: { field: any; clear: boolean }) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit],
        onUpdate: ({ editor }) => {
            // Update form value on editor content change
            field.onChange(editor.getHTML());
        },
        content: clear ? "" : (field.value ?? ""),
    });

    useEffect(() => {
        if (editor && clear) {
            editor.commands.setContent("");
            field.onChange(""); // Ensure form field is also cleared
        }
    }, [clear, editor, field]);

    return (
        <div className='rich-text'>
            <EditorContext.Provider value={{ editor }}>
                <div className='flex flex-col gap-2'>
                    <div className='relative'>
                        <Toolbar variant='fixed'>
                            <ToolbarGroup>
                                <MarkButton type='bold' />
                                <MarkButton type='italic' />
                            </ToolbarGroup>
                            {/* <HeadingDropdownMenu levels={[1, 2, 3, 4]} /> */}

                            <ListDropdownMenu
                                types={["bulletList", "orderedList"]}
                            />
                            <ToolbarGroup>
                                <UndoRedoButton action='undo' />
                                <UndoRedoButton action='redo' />
                            </ToolbarGroup>
                        </Toolbar>
                    </div>

                    <div className='relative mt-10 sm:mt-0'>
                        <EditorContent
                            editor={editor}
                            role='presentation'
                            className='tiptap-editor'
                        />
                    </div>
                </div>
            </EditorContext.Provider>
        </div>
    );
}
