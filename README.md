# glipglop

# Setup and running

```
npm i
npm run build:dev
npm run start:express
curl http://localhost:3000
```


# Fighting CKEditor

This might help:

https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html


```
<CKEditor
editor={ ClassicEditor }
data={this.state.description}
onReady={ editor => {
	// You can store the "editor" and use when it is needed.
	// console.log( 'Editor is ready to use!', editor );
} }
onChange={ ( event, editor ) => {
	// console.log( { event, editor, data } );
} }
onBlur={ ( event, editor ) => {
	console.log( 'Save.');
	const data = editor.getData();
	this.updateFindingDescription(data);
} }
onFocus={ ( event, editor ) => {
	// console.log( 'Focus.', editor );
} }
/>
```


# Some warning

`Warning: React does not recognize the isActive prop on a DOM element` comes from react-router-hash-link
