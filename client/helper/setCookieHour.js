export default ( name, value, hours ) => {   
   var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000 * hours;
	now.setTime(time);
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + now.toUTCString() + ";"   
}  