<script setup lang="ts">
const particlesOptions = {
  fullScreen: {
    enable: false,
    zIndex: 0
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#00C9D4', '#A6FF3A', '#6B7280']
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.3,
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.5,
        sync: false
      }
    },
    links: {
      enable: true,
      distance: 150,
      color: '#00C9D4',
      opacity: 0.2,
      width: 1,
      triangles: {
        enable: true,
        color: '#00C9D4',
        opacity: 0.05
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce'
      },
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: ['grab', 'bubble']
      },
      onClick: {
        enable: false,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
          color: '#A6FF3A'
        }
      },
      bubble: {
        distance: 200,
        size: 6,
        duration: 2,
        opacity: 0.6
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  detectRetina: true,
  background: {
    color: 'transparent'
  }
}

const particlesLoaded = async (_container: unknown) => {
  // Particles loaded
}
</script>

<template>
  <ClientOnly>
    <div class="particles-wrapper">
      <vue-particles
        id="tsparticles"
        :options="particlesOptions"
        @particles-loaded="particlesLoaded"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.particles-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particles-wrapper :deep(#tsparticles) {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
