use std::fs;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tinytemplate::error::Error;
use tinytemplate::TinyTemplate;

#[derive(Debug, Deserialize, Serialize)]
struct Year {
    year: String,
    projects: Vec<Game>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Game {
    name: String,
    tags: Vec<String>,
    description: String,
    links: Vec<Link>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Link {
    title: String,
    url: String,
}

pub fn asset_formatter(value: &Value, output: &mut String) -> Result<(), Error> {
    match value {
        Value::String(name) => {
            output.push_str("assets/");
            output.push_str(
                &*name
                    .chars().filter(|c| c.is_alphanumeric() || c.is_whitespace()).collect::<String>()
                    .to_lowercase()
                    .replace(" ", "-")
            );
            output.push_str(".png");
            Ok(())
        }
        _ => Err(Error::GenericError {
            msg: "Expected a string value.".to_string(),
        }),
    }
}

static GAME: &'static str = "game";
static INDEX: &'static str = "index";

fn main() {
    let mut templates = TinyTemplate::new();

    let game_template = fs::read_to_string(format!("templates/{GAME}.html")).unwrap();
    templates.add_template(GAME, &*game_template).expect("Failed to load game template.");
    let game_template = fs::read_to_string(format!("templates/{INDEX}.html")).unwrap();
    templates.add_template(INDEX, &*game_template).expect("Failed to load game template.");

    templates.add_formatter("asset_formatter", asset_formatter);

    let data: Vec<Year> = serde_json::from_str(
        fs::read_to_string("data/games.json").unwrap().as_str()
    ).unwrap();

    let rendered = templates.render(
        INDEX,
        &data,
    );

    match rendered {
        Ok(r) => {
            match fs::remove_dir_all("output") { _ => () }
            copy_dir::copy_dir("static", "output").expect("Couldn't copy static/");
            fs::write("output/index.html", r).expect("Couldn't write index.html");
        },
        Err(e) => println!("{}", e),
    }
}
