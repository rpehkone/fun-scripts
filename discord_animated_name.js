anims = [
		[
			"●∙∙",
			"∙●∙",
			"∙∙●",
			"∙●∙"
		],
		[
			"🌑",
			"🌒",
			"🌓",
			"🌔",
			"🌕",
			"🌖",
			"🌗",
			"🌘"
		],
		[
			"⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"

		],
		[
			"🟢", "🟡", "🟠", "🔴", "🟣", "🔵", "🌐"
		],
		[
			"😄",
			"😝"
		],
   		[
			"▁",
			"▃",
			"▅",
			"▆",
			"▇",
			"▆",
			"▅",
			"▃"
		],
		[
			"▐⠂       ▌",
			"▐⠈       ▌",
			"▐ ⠂      ▌",
			"▐ ⠠      ▌",
			"▐  ⡀     ▌",
			"▐  ⠠     ▌",
			"▐   ⠂    ▌",
			"▐   ⠈    ▌",
			"▐    ⠂   ▌",
			"▐    ⠠   ▌",
			"▐     ⡀  ▌",
			"▐     ⠠  ▌",
			"▐      ⠂ ▌",
			"▐      ⠈ ▌",
			"▐       ⠂▌",
			"▐       ⠠▌",
			"▐       ⡀▌",
			"▐      ⠠ ▌",
			"▐      ⠂ ▌",
			"▐     ⠈  ▌",
			"▐     ⠂  ▌",
			"▐    ⠠   ▌",
			"▐    ⡀   ▌",
			"▐   ⠠    ▌",
			"▐   ⠂    ▌",
			"▐  ⠈     ▌",
			"▐  ⠂     ▌",
			"▐ ⠠      ▌",
			"▐ ⡀      ▌",
			"▐⠠       ▌"
		]
	];

fonts = ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		 '卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙',
		 'ค๒ς๔єŦﻮђเןкɭ๓ภ๏קợгรՇยשฬאץչค๒ς๔єŦﻮђเןкɭ๓ภ๏קợгรՇยשฬאץչ',
		 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
		 'ᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎOᑭᑫᖇᔕTᑌᐯᗯ᙭YᘔᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎOᑭᑫᖇᔕTᑌᐯᗯ᙭Yᘔ',
		 '∀ᙠƆᗡƎℲ⅁HIſ⋊˥WNOԀΌᴚS⊥∩ΛMX⅄Zɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz'];

async function changename(name) {
	await fetch("https://discord.com/api/v9/guilds/

	// copied PATCH request here     |
	//replace ending part with this. V

		"body": "{\"nick\":\"" + name + "\"}",
		"method": "PATCH",
		"mode": "cors"
	});
}

function rot13Fast(n, str) {
  	if (n == 5) {
		str = [...str].reverse().join("");
	}
	rot13Fast.output = fonts[n];
	rot13Fast.input  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	rot13Fast.lookup = rot13Fast.input.reduce((m,k,i) => Object.assign(m, {[k]: rot13Fast.output[i]}), {})  
	return str.split('').map(x => rot13Fast.lookup[x] || x).join('')
} 

async function animator(username, anim_id) {
	new_name = username;
	left_padding = 0;
	font_id = 1;
	scroll_dir = 1;
	icon_index = 0;
	while (true) {
		scrolling_name = "          " + new_name;
		len = scrolling_name.length;
		scrolling_name = scrolling_name.slice(left_padding, left_padding + 10);
		left_padding = left_padding + scroll_dir;
		if (left_padding == 0 || left_padding == len) {
			scroll_dir *= -1;
			new_name = rot13Fast(font_id, username);
			font_id += 1;
			font_id %= fonts.length;
		}

		animated_icon = anims[anim_id][icon_index % Object.keys(anims[anim_id]).length];
		icon_index = icon_index + 1;

		// console.log(animated_icon + scrolling_name);
		changename(animated_icon + scrolling_name);
		await new Promise(r => setTimeout(r, 1200));
	}
}

animator("test name", 1);
