"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Code,
  FileCode,
  Eye,
} from "lucide-react";

/**
 * RichTextEditor Component
 * A WYSIWYG editor using Tiptap for creating formatted blog content
 *
 * Features:
 * - Bold, Italic, Headings (H2, H3)
 * - Bullet and Numbered Lists
 * - Blockquotes and Code Blocks
 * - Undo/Redo functionality
 * - Keyboard shortcuts support
 * - HTML Source view for pasting raw HTML
 *
 * @param {string} value - Initial HTML content
 * @param {Function} onChange - Callback when content changes, receives HTML string
 * @param {string} placeholder - Placeholder text for empty editor
 */
const RichTextEditor = ({ value, onChange, placeholder }) => {
  // State to toggle between Visual Editor and HTML Source view
  const [showHtmlSource, setShowHtmlSource] = useState(false);

  // State for HTML textarea (when in source view)
  const [htmlSource, setHtmlSource] = useState(value || "");
  // Initialize Tiptap editor with configuration
  const editor = useEditor({
    // Prevent SSR hydration mismatch by rendering only on client side
    immediatelyRender: false,

    // Configure editor extensions
    extensions: [
      // StarterKit includes basic formatting options
      StarterKit.configure({
        heading: {
          levels: [2, 3], // Only allow H2 and H3 headings
        },
      }),
      // Placeholder extension shows hint text when editor is empty
      Placeholder.configure({
        placeholder: placeholder || "Write your content here...",
      }),
    ],

    // Set initial content from props
    content: value || "",

    // Handle content updates - convert to HTML and call onChange
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },

    // Configure editor styling with Tailwind prose classes
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  // Return null while editor is initializing
  if (!editor) {
    return null;
  }

  /**
   * Toggle between Visual Editor and HTML Source
   * When switching to source, sync editor content to textarea
   * When switching back, sync textarea content to editor
   */
  const handleToggleView = () => {
    if (showHtmlSource) {
      // Switching back to Visual Editor - Load HTML from textarea
      editor.commands.setContent(htmlSource);
      onChange(htmlSource);
    } else {
      // Switching to HTML Source - Get current HTML from editor
      setHtmlSource(editor.getHTML());
    }
    setShowHtmlSource(!showHtmlSource);
  };

  /**
   * Handle HTML source textarea changes
   * Update state and parent component
   */
  const handleHtmlSourceChange = (e) => {
    const newHtml = e.target.value;
    setHtmlSource(newHtml);
    onChange(newHtml);
  };

  /**
   * Reusable Toolbar Button Component
   * Renders a button with active state styling
   */
  const ToolbarButton = ({ onClick, active, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 border border-black hover:bg-[#DBF3FF] transition-colors ${
        active ? "bg-[#65BBDF] text-white" : "bg-white"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-black shadow-[-2px_2px_0_#DBF3FF]">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap justify-between gap-1 p-2 border-b border-black bg-gray-50">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting Buttons - Only show in Visual mode */}
          {!showHtmlSource && (
            <>
              {/* Bold Button - Toggle bold text formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </ToolbarButton>

              {/* Italic Button - Toggle italic text formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </ToolbarButton>

              {/* Heading Buttons */}

              {/* H2 Heading Button */}
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor.isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </ToolbarButton>

              {/* H3 Heading Button */}
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                active={editor.isActive("heading", { level: 3 })}
                title="Heading 3"
              >
                <Heading3 className="w-4 h-4" />
              </ToolbarButton>

              {/* List Buttons */}

              {/* Bullet List Button */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive("bulletList")}
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </ToolbarButton>

              {/* Numbered List Button */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive("orderedList")}
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </ToolbarButton>

              {/* Blockquote Button */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive("blockquote")}
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </ToolbarButton>

              {/* Code Block Button */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive("codeBlock")}
                title="Code Block"
              >
                <Code className="w-4 h-4" />
              </ToolbarButton>

              {/* Vertical Divider */}
              <div className="w-px bg-gray-300 mx-1" />

              {/* History Buttons */}

              {/* Undo Button - Revert last change */}
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </ToolbarButton>

              {/* Redo Button - Restore undone change */}
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </ToolbarButton>
            </>
          )}
        </div>

        {/* View Toggle Button - Right side */}
        <button
          type="button"
          onClick={handleToggleView}
          className="flex items-center gap-2 px-3 py-2 border border-black bg-white hover:bg-[#DBF3FF] transition-colors text-sm font-medium"
          title={
            showHtmlSource ? "Switch to Visual Editor" : "Switch to HTML Source"
          }
        >
          {showHtmlSource ? (
            <>
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Visual</span>
            </>
          ) : (
            <>
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">HTML</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Content - Show either Visual Editor or HTML Source */}
      {showHtmlSource ? (
        // HTML Source View - Textarea for raw HTML editing
        <textarea
          value={htmlSource}
          onChange={handleHtmlSourceChange}
          placeholder="Paste your HTML code here..."
          className="w-full min-h-[300px] p-4 font-mono text-sm bg-gray-50 focus:outline-none focus:bg-white resize-y"
          spellCheck="false"
        />
      ) : (
        // Visual Editor View - Rich text editing
        <EditorContent editor={editor} className="bg-white" />
      )}
    </div>
  );
};

export default RichTextEditor;
