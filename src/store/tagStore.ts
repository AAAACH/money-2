import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],

// ZT 
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },

// Y
  findTag(id: string) { 
    return this.tagList.filter(t => t.id === id)[0];
  },

// Y+ZT
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id, name: name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },    

// Y+ZT
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

// Y+ZT
  updateTag (id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
      const tag = this.tagList.filter(item => item.id === id)[0];
      tag.name = name;
      this.saveTags();
      return 'success';
      }
    } else {
      return 'not found';
    }
  },

// ZT
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};

tagStore.fetchTags();

export default tagStore;