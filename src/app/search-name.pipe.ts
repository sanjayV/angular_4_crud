import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchName',
})

export class SearchName implements PipeTransform {
	transform(users: any[], name: string): any {
		if (!users || !users.length || !name) {
			return users;
		}

		return users.filter(user => {
			if (user.name) {
				return user.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
			}
			return false;
		})
	}
}