<template>
    <div id="customInput">
        <label>

            <i v-if="icon != ''">
              <font-awesome-icon :icon="icon" />
            </i>
            <input 
            class="input"
            :type="type" 
            v-on="$listeners"
            placeholder=" "
            :value="value" 
            @input="$emit('update', $event.target.value)"
          />
          
          <p>{{ label }}</p>
          <div class="password-icon" v-if="savetype === 'password'">
            <i class="eyeOn" @click="changeOff"><font-awesome-icon icon="eye" /></i>
            <i class="eyeOff" @click="changeOn"><font-awesome-icon icon="eye-slash" /></i>
          </div>
        </label>
    </div>
</template>
<script>
const TYPES = [
    "text",
    "password",
    "email",
    "number",
    "url",
    "tel",
    "search",
    "color"
];
const includes = types => type => types.includes(type);

////////////// PASSWORD


///////////////// APP
export default {
  name: "CustomInput",
  inheritAttrs: false,
  data() {
    return {
      savetype: ""

    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    placeholder: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        const isValid = includes(TYPES)(value);
        if (!isValid) {
          console.warn(`Types autorisé ${TYPES}`);
        }
        return isValid;
      }
    }
  },
  model: {
    prop: "value",
    event: "update"
  },
  methods: {
    changeOff() {
        this.$el.querySelector('.eyeOn').style.display = 'none';
        this.$el.querySelector('.eyeOff').style.display = 'block';
        this.$el.querySelector('.input').type = 'text';
    },
    changeOn() {
        this.$el.querySelector('.eyeOn').style.display = 'block';
        this.$el.querySelector('.eyeOff').style.display = 'none';
        this.$el.querySelector('.input').type = 'password';
        
    }
  },
  created() {
    this.savetype = this.type;
  },
};
</script>
<style lang="scss" scoped>
$color: #26F191;

  #customInput {
    label {
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 5px;
      border: 2px solid $color;
      i {
        color: $color;
        font-size: 2vh;
        margin: 0 1.2vw;
      }
      .input {
        display: flex;
        align-items: center;
        font-size: 1.5vh;
        color: $color;
        background: transparent;

        padding: 1.2vh 3.2rem 1.2vh 1.2rem;
        min-width: 10vw;
        width: 100%;
        border: none;
        outline: none;
        &:focus {
          border-color: $color;
        }
        &:focus + p,
        &:not(:placeholder-shown) + p {
          top: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: $color;
        }
        &:not(:focus) + p {
          color: black;
        }
      }
      p {
        color: black;
        font-size: 1rem;
        user-select: none;

        position: absolute;
        top: 50%;
        left: 2vw;
        transform: translateY(-50%);

        margin-left: 0.8rem;
        padding: 0 0.4rem;

        background: white;
        transition: top 0.2s, font-size 0.2s, color 0.2s;
        cursor: text;
      }
      .password-icon {
        display: flex;
        align-items: center;

        position: absolute;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
        width: 1.2rem;

        color: $color;
        transition: color 0.2s;

        cursor: pointer;
        .eyeOff {
          display: none;
        }
      }
    }
  }
</style>