<template>
<div class="autocomplete">
    <p class="control icon-right">
        <input v-bind:style="setInputHeight()" type="text" class="input-dropdown" placeholder="" @input="onInput($event.target.value)" @blur="isOpened = false" @keyup.enter="select" @keyup.tab="select" @keydown.down="onDown" @keydown.up="onUp" @keyup.esc="isOpen = false" ref="dropdown" v-model="search" />
    </p>
    <transition name="fade" mode="in-out">
        <ul class="options-list" v-show="isOpened">
            <li :key="i" v-for="(option, i) in filteredItems" @mouseenter="selected = i" @mousedown="select" :class="{'selected': i === selected}">
                {{ option.name }}
                <slot name="item" :title="option.name" :id="option.id" />
            </li>
        </ul>
    </transition>
    <div class="icon">
        <b-icon icon="search" variant="#8898aa"></b-icon>
    </div>
</div>
</template>

<script>
export default {
    name: 'AutocompleteDropdown',
    props: {
        options: {
            type: Array,
            required: true
        },
        height: Number
    },
    data() {
        return {
            isOpened: false,
            selected: null,
            search: ""
        };
    },
    methods: {
        onInput(value) {
            this.isOpened = !!value; //(value != '');
            this.selected = null;
        },
        select() {
            const selectedOption = this.filteredItems[this.selected];
            this.$emit("select-item", selectedOption);
            this.search = selectedOption.name;
            this.isOpened = false;
        },
        onDown() {
            if (!this.isOpened) {
                return;
            }
            this.selected = (this.selected + 1) % this.filteredItems.length;
        },
        onUp() {
            if (!this.isOpened) {
                return;
            }

            this.selected =
                this.selected - 1 < 0 ?
                this.filteredItems.length - 1 :
                this.selected - 1;
        },
        toggle() {
            this.isOpened = !this.isOpened;
            if (this.isOpened) {
                //this.$refs.dropdown.focus();
            }
        },
        setInputHeight() {
            if (!this.height) {
                this.height = 30;
            }
            return {
                height: `${this.height}px`
            };
        }
    },
    computed: {
        filteredItems() {
            const condition = new RegExp(this.search, "i");
            return this.options.filter(item => item.name.match(condition));
        }
    }
}
</script>

<style scoped>
.autocomplete {
    position: relative;
    width: 100%;
}

ul.options-list li.selected {
    background-color: #f6f9fc;
    color: #8898aa;
}

input.input-dropdown {
    width: 100%;
    border-radius: 2px 0 0 2px;
    font-size: 16px;
    padding-right: 38px;
    padding-left: 8px;
    padding-left: 50px;
    font-weight: 400;
    border: none;
    box-shadow: none;
}

input.input-dropdown:focus {
    border: none;
    outline: none;
}

input.input-dropdown::-webkit-input-placeholder {
    color: #fff;
}

p.control {
    position: relative;
    display: flex;
    margin-bottom: 0rem;
    z-index: 10;
}

ul.options-list {
    position: absolute;
    top: 60px;
    width: 100%;
    left: 0px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-radius: 0.375rem;
    max-height: 300px;
    z-index: 10;
    overflow-y: auto;
    box-shadow: 0 2px 3px 0 #e9edf1;
}

ul.options-list li {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
    color: #666;
    background-color: #fff;
    cursor: pointer;
    transition: 0.3s all ease;
}

.icon-right i {
    transition: 0.3s all ease;
}

ul.options-list li span {
    margin-right: 4px;
}

ul.options-list li:last-child {
    border-bottom: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
    will-change: opacity;
    transform: translateY(-30px);
}

.icon {
    position: absolute;
    top: 16px;
    left: 16px;

    z-index: 11;

}

.icon svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: #8898aa;
}
</style>
