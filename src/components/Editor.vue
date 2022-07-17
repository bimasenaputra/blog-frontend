<template>
	<div>
		<EditorContent :editor="editor" />
	</div>
</template>

<script setup>
	import { watch } from 'vue'
	import { useEditor, EditorContent } from '@tiptap/vue-3'
	import StarterKit from '@tiptap/starter-kit'

	const props = defineProps({
		modelValue: String
	})

	const emit = defineEmits(['update'])

	const editor = useEditor({
		content: props.modelValue,
		extensions: [
			StarterKit
		],
		editorProps: {
			attributes: {
				class: 'min-w-full w-full text-gray-500 prose prose-sm lg:prose focus:outline-none' 
			}
		},
		onUpdate: (context) => {
			emit('update:modelValue', context.editor.getHTML())
		}
	})

	watch(() => props.modelValue, (value) => {
		if (editor.value.getHTML() === value) {
			return
		}
		editor.value.commands.setContent(props.modelValue)
	})
</script>