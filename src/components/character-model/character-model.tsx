import Slider from '@mui/material/Slider';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Character, CharacterModels } from '../../types/Character';
import './character-model.scss';

function CharacterModel({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  interface RGB {
    r: number,
    g: number,
    b: number,
  };

  interface HSL {
    h: number,
    s: number,
    l: number,
  };

  function changeHue(rgb: RGB, degree: number): RGB {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
      hsl.h -= 360;
    }
    else if (hsl.h < 0) {
      hsl.h += 360;
    }
    return hslToRGB(hsl);
  }

  function rgbToHSL(rgb: RGB): HSL {
    var r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      cMax = Math.max(r, g, b),
      cMin = Math.min(r, g, b),
      delta = cMax - cMin,
      l = (cMax + cMin) / 2,
      h = 0,
      s = 0;

    if (delta == 0) {
      h = 0;
    }
    else if (cMax == r) {
      h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
      h = 60 * (((b - r) / delta) + 2);
    }
    else {
      h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
      s = 0;
    }
    else {
      s = (delta / (1 - Math.abs(2 * l - 1)))
    }

    return {
      h: h,
      s: s,
      l: l
    }
  }

  function hslToRGB(hsl: HSL): RGB {
    var h = hsl.h,
      s = hsl.s,
      l = hsl.l,
      c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r, g, b;

    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    }
    else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    }
    else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    }
    else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    }
    else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    }
    else {
      r = c;
      g = 0;
      b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return { r, g, b };
  }

  function normalize_rgb_value(color: number, m: number): number {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
      color = 0;
    }
    return color;
  }

  useEffect(() => {
    var canvas = document.getElementById('character-canvas') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    } as CanvasRenderingContext2DSettings);
    var img = new Image;
    // img.src = URL.createObjectURL(e.target.files[0]); // Use if uploaded custom image
    img.src = character.model.imageUrl;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

      if (imageData?.data == undefined) {
        return;
      }

      // Change colors based on house
      for (let i = 0; i < imageData?.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        // If clear pixel, skip logic
        if (alpha < 100) {
          continue;
        }

        // TODO: Make this logic more flexible?
        // Currently set to only work if the original image has BLUE as the main house colors, expects
        // the robes to be in grayscale, and the skin color has a natural, green undertone.
        //
        // For ease of calculation, I would prefer the robes be either RED, BLUE, or GREEN. I want to choose
        // the color furthest away from skin, which I *think* is BLUE (hence the original image is blue)
        if (
          Math.max(red, green, blue) - Math.min(red, green, blue) > 20 && // Exclude grayscale pixels
          (
            red < 75 || // Exclude skin tones
            (red > 150 && blue > 250) || // highlights
            (red < 200 && blue > 190) // mid-tones
          ) &&
          blue > 40) {
          // Convert to color of the house
          // This should be done with a hue shift/rotate to maintain the highlights/shadows of the original image

          // // DEBUG: Turn pixels green for debugging
          // imageData.data[i] = 0;
          // imageData.data[i + 1] = 255;
          // imageData.data[i + 2] = 0;

          const newRGB = changeHue({ r: red, g: green, b: blue }, character.robeColorHue);

          imageData.data[i] = newRGB.r;
          imageData.data[i + 1] = newRGB.g;
          imageData.data[i + 2] = newRGB.b;
        }
      }

      ctx?.putImageData(imageData, 0, 0);

      canvas.style.margin = character.model.extraMargin;
      canvas.style.maxWidth = character.model.maxWidth;
    }
  }, [character.model.imageUrl, character.robeColorHue]);

  function onModelSelected(modelId: number) {
    if (modelId == character.model.id) {
      return;
    }

    setCharacter((prevChar) => {
      return { ...prevChar, model: CharacterModels.filter(cm => cm.id == modelId)[0] };
    });
  }

  function onSliderChange(value: number) {
    setCharacter((prevChar) => {
      return { ...prevChar, robeColorHue: value };
    });
  }

  return (
    <div className="model-container">
      <canvas className="character" id="character-canvas"></canvas>
      <img className="stand" src="images/stand.png" alt="stand-png" />

      <div className="model-selector">
        <span>Model</span>
        {CharacterModels.map(model => (
          <div
            className={`model-option ${model.id == character.model.id ? 'selected-model' : ''}`}
            onClick={() => { onModelSelected(model.id) }}
            key={model.id}>
            {model.id}
          </div>
        ))}
      </div>

      <div className="robe-hue-selector">
        <span className='hue-selector-label'>Robe Hue</span>
        <Slider
          value={character.robeColorHue}
          min={0}
          max={360}
          onChangeCommitted={(e, value) => { onSliderChange(value as number) }}></Slider>
      </div>
    </div>
  );
}

export default CharacterModel;
