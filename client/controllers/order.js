Template.order.events({
	'click #submit-order': () => {

		var firstName = $("#first-name").val()
		var lastName = $("#last-name").val()
		var address1 = $("#address-1").val()
		var address2 = $("#address-2").val()
		var zipCode = $("#zip-code").val()
		var city = $("#city").val()
		var state = $("#state").val()
		var country = $("#country").val()
		var phoneNumber = $("#phone-number").val()

		var products = []
		Object.values(Meteor.user().profile.build.parts).forEach((part) => {
			products.push({
				product_id: part.amazonUrl.split('/dp/')[1],
				quantity: 1
			})
		})


		var order = {
			client_token: '22D5C4AF35B78E996DC0505F',
			retailer: 'amazon',
			products: products,
			shipping_address: {
				first_name: firstName,
				last_name: lastName,
				address_line1: address1,
				address_line2: address2,
				zip_code: zipCode,
				city: city,
				state: state,
				country: country,
				phone_number: phoneNumber
			},
			shipping: {
				max_price: 0
			},
		}

		HTTP.call( 'POST', 'https://api.zinc.io/v0/order', {
			data: order
		}, function( error, response ) {
			if ( error ) {
				console.log( error );
			} else {
				console.log( response );
				setTimeout(() => {
					console.log(response)
					response = JSON.parse(response.content)
					console.log(response)
					HTTP.call('GET', "https://api.zinc.io/v0/order/" + response.request_id, (error, response) => {
						console.log(error, response);
						console.log(JSON.parse(response.content));
					})
				}, 2000);
			}
		});

		Contributions.insert({
			amount: -parseFloat(Meteor.user().profile.build.cost),
			name: 'Build purchase',
			time: Date.now(),
			shareId: Meteor.user().profile.shareId
		})

		Router.go('/dashboard')
	}
})